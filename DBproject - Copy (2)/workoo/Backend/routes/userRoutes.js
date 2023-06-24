// server.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const express = require("express");
const SECRET_KEY = "123141"; 
const saltRounds = 10;
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});
const router = express.Router();
// User routes
module.exports = (connection) => {
  router.get("/", (req, res) => {
    connection.query("SELECT * FROM user", (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(results);
    });
  }); 
// Single route 
  router.get("/:id", (req, res) => {
    const {id}=req.params
    connection.query("SELECT * FROM user WHERE user_id = ?",[id], (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(results);
    });
  });
// DELETE /service-providers/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
//   try {
    // const result = await connection.query('DELETE FROM service_provider WHERE serviceprovider_id = ?', [id]);
    connection.query('DELETE FROM user WHERE user_id = ?',[id], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('User deleted successfully' );
          return;
        }
        res.json(results);
      });
    // console.log(result)
//     if (result.affectedRows > 0) {
//       res.json({ message: 'Service provider deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Service provider not found' });
//     }
//   } catch (err) {
//     console.error('Error deleting service provider:', err);
//     res.status(500).send('Internal Server Error');
//   }
 });

  router.post("/register", upload.single('ProfilePic'), (req, res) => {
   
    const { name, password, email, longitude,latitude } = req.body;
    let query = "INSERT INTO user SET ";
    let values = [];

    if (name) {
      query += "user_name = ?, ";
      values.push(name);
    }
    if (email) {
      query += "user_email = ?, ";
      values.push(email);
    }

    if (longitude) {
      query += "longitude = ?, ";
      values.push(longitude);
    }
    if (latitude) {
      query += "latitude = ?, ";
      values.push(latitude);
    }
    if (req.file) {
      query += "user_ProfilePic = ?, ";
      const imgsrc="http://localhost:3000/public/"  + req.file.filename
      values.push(imgsrc);
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (hashedPassword) {
        query += "user_password = ?, ";
        values.push(hashedPassword);
      }
      // Remove the trailing comma and space
      query = query.slice(0, -2);
      // Store the hashed password in the database (or perform any other necessary operations)
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        // Generate and sign the JWT token
        const token = jwt.sign({ userId: results.insertId }, SECRET_KEY, {
          expiresIn: "1h",
        });

        // Return the token as a response
        res.status(201).json({ token });
      });
    });

    // connection.query(query,values, (err, results) => {
    //   if (err) {
    //     console.error('Error executing MySQL query:', err);
    //     res.status(500).send('Internal Server Error');
    //     return;
    //   }
    //   res.status(201).json({ id: results.insertId });
    // });
  });
  // Login API
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user WHERE user_email  = ?";

  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (results.length === 0) {
      // User not found
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const user = results[0];

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.user_password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error("Error comparing passwords:", bcryptErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (bcryptResult) {
        // Passwords match, user is authenticated
        // Generate a JWT token
        const token = jwt.sign({ email: user.user_email }, SECRET_KEY, { expiresIn: '1h' });
           const data={
            "token":token,
            "user_id":user.user_id}
        res.status(200).json(data);
      } else {
        // Passwords don't match
        res.status(401).json({ message: "Invalid email or password" });
      }
    });
  });
});

  // router.post("/login", (req, res) => {
  //   const { email, password } = req.body;

  //   const query = "SELECT * FROM user WHERE user_email  = ?";

  //   connection.query(query, [email], (err, results) => {
  //     if (err) {
  //       console.error("Error executing MySQL query:", err);
  //       res.status(500).send("Internal Server Error");
  //       return;
  //     }

  //     if (results.length === 0) {
  //       // User not found
  //       res.status(401).json({ message: "Invalid email or password" });
  //       return;
  //     }

  //     const user = results[0];

  //     // Compare the provided password with the stored hashed password
  //     if (password === user.user_password) {
  //       // Passwords match, user is authenticated
  //       // You can generate a token or session here and return it as a response
  //       res.status(200).json({ message: "Login successful" });
  //     } else {
  //       // Passwords don't match
  //       res.status(401).json({ message: "Invalid email or password" });
  //     }
  //   });
  // });
  return router;
};

// Service Provider routes
// Define routes and handlers for service providers

// Service Request routes
// Define routes and handlers for service requests

// Payment routes
// Define routes and handlers for payments

// Review and Rating routes
// Define routes and handlers for reviews and ratings

// Messaging routes
// Define routes and handlers for messaging

// Notification routes
// Define routes and handlers for notifications

// Search and Filtering routes
// Define routes and handlers for search and filtering

// Admin routes
// Define routes and handlers for admin panel
