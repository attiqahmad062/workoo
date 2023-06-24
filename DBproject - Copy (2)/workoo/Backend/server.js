// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
const socket = require('socket.io');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port:3308,
  database: 'workoo_2'
});
// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors());
app.use(cors({ origin: 'http://localhost:3001' }));
const userRoute=require("../Backend/routes/userRoutes.js")(connection);
const serviceProviderRoute=require("../Backend/routes/serviceProvider.js")(connection);
const servicesRoutes = require('./routes/servicesRoutes.js')(connection);
const reviewRoute = require('../Backend/routes/reviewsRoute.js')(connection)
const messageRoute = require('../Backend/routes/messageroute.js')(connection)
// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '/')));
// User routes
app.use('/users/',userRoute)
app.use('/service_provider/',serviceProviderRoute)
app.use('/service/',servicesRoutes)
app.use('/reviews/',reviewRoute)
app.use('/message/',messageRoute)


// Start the server
const server=app.listen(port, () => 
{
  console.log(`Server listening on port ${port}`);
});


// Initialize Socket.io
const io = socket(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

// Track connected users' sockets
const connectedUsers = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  // Receive user authentication
  socket.on('authenticateUser', (userId) => {
    connectedUsers[userId] = socket;
    console.log(`User ${userId} authenticated`);
  });

  // Receive new message from the client
  socket.on('sendMessage', (message) => {
    const { senderId, receiverId, content } = message;
    connection.query(
      'INSERT INTO messages (user_id, receiver_id, message_description) VALUES (?, ?, ?)',
      [senderId, receiverId, content],
      (err, result) => {
        if (err) {
          console.error('Failed to create a new message');
          console.log(err)
        } else {
          // Emit the new message to the intended receiver socket
          const receiverSocket = connectedUsers[receiverId];
          if (receiverSocket) {
            receiverSocket.emit('newMessage', { id: result.insertId, senderId, receiverId, content });
          }
        }
      }
    );
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    // Remove the disconnected user from the connected users' list
    const disconnectedUserId = Object.keys(connectedUsers).find((userId) => connectedUsers[userId] === socket);
    if (disconnectedUserId) {
      delete connectedUsers[disconnectedUserId];
      console.log(`User ${disconnectedUserId} disconnected`);
    }
  });
});