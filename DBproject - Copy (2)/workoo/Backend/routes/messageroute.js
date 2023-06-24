// serviceProviders.js (Route file)

const express = require('express');
const router = express.Router();

//messsage route
module.exports = (connection) => {
// API endpoint to get messages between two users
router.get('/:userId1/:userId2', (req, res) => {
    const { userId1, userId2 } = req.params;
    console.log(userId1,userId2)
    const query =
      'SELECT * FROM messages WHERE (user_id = ? AND receiver_id = ?) OR (user_id = ? AND receiver_id = ?) ';
    connection.query(query, [userId1, userId2, userId2, userId1], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
      } else {
        console.log(results)
        res.json(results);
      }
    });
  });
  
  // API endpoint to create a new message
  router.post('/', express.json(), (req, res) => {
    const { senderId, receiverId, content } = req.body;
    const query = 'INSERT INTO messages (user_id, receiver_id, message_description) VALUES (?, ?, ?)';
    connection.query(query, [senderId, receiverId, content], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to create a new message' });
      } else {
        // Emit the new message to the intended receiver socket
        const receiverSocket = connectedUsers[receiverId];
        if (receiverSocket) {
          receiverSocket.emit('newMessage', { id: result.insertId, senderId, receiverId, content });
        }
        res.json({ message: 'Message created successfully' });
      }
    });
  });
  
return router;
}
