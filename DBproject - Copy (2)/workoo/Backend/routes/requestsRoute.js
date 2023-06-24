// serviceProviders.js (Route file)

const express = require('express');
const router = express.Router();



// GET /service-providers
module.exports = (connection) => {
    app.get('/requests', (req, res) => {
        // Fetch all service requests from the MySQL database
        const query = `SELECT * FROM requests`;
      
        db.query(query, (error, results) => {
          if (error) {
            console.error('Error retrieving service requests:', error);
            res.status(500).json({ error: 'Failed to retrieve service requests' });
          } else {
            res.status(200).json(results);
          }
        });
      });
      

app.post('requests', (req, res) => {
    const {
      requestId,
      serviceProviderId,
      userId,
      requestDate,
      description,
      requesterId
    } = req.body;
  
    // Insert the request into the MySQL database
    const query = `INSERT INTO requests (request_id, serviceprovider_id, user_id, request_date, description, requester_id)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [requestId, serviceProviderId, userId, requestDate, description, requesterId];
  
    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error creating service request:', error);
        res.status(500).json({ error: 'Failed to create service request' });
      } else {
        res.status(201).json({ message: 'Service request created successfully' });
      }
    });
  });
  
  app.get('/requests/user/:userId', (req, res) => {
    const { userId } = req.params;
  
    // Fetch service requests by user ID from the MySQL database
    const query = `SELECT * FROM requests WHERE user_id = ?`;
    const values = [userId];
  
    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error retrieving service requests:', error);
        res.status(500).json({ error: 'Failed to retrieve service requests' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.get('/requests/provider/:providerId', (req, res) => {
    const { providerId } = req.params;
  
    // Fetch service requests by service provider ID from the MySQL database
    const query = `SELECT * FROM requests WHERE serviceprovider_id = ?`;
    const values = [providerId];
  
    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error retrieving service requests:', error);
        res.status(500).json({ error: 'Failed to retrieve service requests' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.patch('/requests/:requestId/status', (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
  
    // Update the status of the service request in the MySQL database
    const query = `UPDATE service_requests SET status = ? WHERE request_id = ?`;
    const values = [status, requestId];
  
    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error updating service request status:', error);
        res.status(500).json({ error: 'Failed to update service request status' });
      } else {
        res.status(200).json({ message: 'Service request status updated successfully' });
      }
    });
  });
  

return router;
}
