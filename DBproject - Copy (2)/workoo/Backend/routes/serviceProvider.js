// serviceProviders.js (Route file)

const express = require('express');
const router = express.Router();

// GET /service-providers
module.exports = (connection) => {
router.get('/',  (req, res) => {
    connection.query('SELECT * FROM service_provider', (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.json(results);
      });
  
});

// GET /service-providers/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
//   console.log(id);
connection.query('SELECT * FROM service_provider WHERE serviceprovider_id= ?',[id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
//   try {
//     const serviceProviders = await connection.query('SELECT * FROM service_provider WHERE serviceprovider_id = ?', [id]);
//     if (serviceProviders.length > 0) {
//       res.json(serviceProviders[0]);
//     } else {
//       res.status(404).json({ message: 'Service provider not found' });
//     }
//   } catch (err) {
//     console.error('Error fetching service provider:', err);
//     res.status(500).send('Internal Server Error');
//   }
});

// POST /service-providers
router.post('/', async (req, res) => {
  const {user_id,experience,availability_hours,number_of_orders_completed, } = req.body;
  let query = 'INSERT INTO service_provider SET ';
  let values = [];
  if(user_id){
    query += 'user_id = ?, ';
    values.push(user_id);
  }
  if (experience) {
    query += 'experience = ?, ';
    values.push(experience);
  }

  if (availability_hours) {
    query += 'availability_hours = ?, ';
    values.push(availability_hours);
  }

  if (number_of_orders_completed) {
    query += 'number_of_orders_completed = ?, ';
    values.push(number_of_orders_completed);
  }

  

  // Remove the trailing comma and space
  query = query.slice(0, -2);
  try {
    await connection.query(query,values);
    res.status(201).json({ message: 'Service provider created successfully' });
  } catch (err) {
    console.error('Error creating service provider:', err);
    res.status(500).send('Internal Server Error');
  }
});

// PUT /service-providers/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {user_id,experience,availability_hours,number_of_orders_completed } = req.body;
  let query = 'UPDATE service_provider SET ';
  let values = [];

  if (experience) {
    query += 'experience = ?, ';
    values.push(experience);
  }
  if (user_id) {
    query += 'user_id = ?, ';
    values.push(user_id);
  }
  if (availability_hours) {
    query += 'availability_hours = ?, ';
    values.push(availability_hours);
  }

  if (number_of_orders_completed) {
    query += 'number_of_orders_completed = ?, ';
    values.push(number_of_orders_completed);
  }

 
  query = query.slice(0, -2);
query+='WHERE serviceprovider_id = ?'
values.push(id)
  // Remove the trailing comma and space
  connection.query(query,values, (err, results) => {
    if (results.affectedRows > 0) {
              res.json({ message: 'Service provider updated successfully' });
            } else {
              res.status(404).json({ message: 'Service provider not found' });
            }
    // res.json(results);
  });
//   try {
//     const result = await connection.query(query,values);
//     if (result.affectedRows > 0) {
//       res.json({ message: 'Service provider updated successfully' });
//     } else {
//       res.status(404).json({ message: 'Service provider not found' });
//     }
//   } catch (err) {
//     console.error('Error updating service provider:', err);
//     res.status(500).send('Internal Server Error');
//   }
});

// DELETE /service-providers/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
//   try {
    // const result = await connection.query('DELETE FROM service_provider WHERE serviceprovider_id = ?', [id]);
    connection.query('DELETE FROM service_provider WHERE serviceprovider_id = ?',[id], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Service provider deleted successfully' );
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

return router;
}
