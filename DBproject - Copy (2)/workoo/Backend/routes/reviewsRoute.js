// serviceProviders.js (Route file)

const express = require('express');
const router = express.Router();

// GET /service-providers
module.exports = (connection) => {
// router.get('/',  (req, res) => {
//     connection.query('SELECT * FROM review', (err, results) => {
//         if (err) {
//           console.error('Error executing MySQL query:', err);
//           res.status(500).send('Internal Server Error');
//           return;
//         }
//         res.json(results);
//       });
  
// });

// GET /service_review/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // console.log("service id in backend",id)
connection.query('SELECT * FROM review WHERE service_id= ?',[id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    // console.log(results)
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

// POST /service-review
router.post('/', async (req, res) => {
  let {newReview,service_id,user_id } = req.body;
  
  let query = 'INSERT INTO review SET ';
  let values = [];
  if(newReview){
    query += 'rev_description = ?, ';
    values.push(newReview);
  }
  

  if (service_id) {
    query += 'service_id = ?, ';
    values.push(service_id);
  }
  if(user_id){
    query += 'user_id = ?, ';
    values.push(user_id);
  }

 
  

  // Remove the trailing comma and space
  query = query.slice(0, -2);
  try {
    await connection.query(query,values);
    res.status(201).json({ message: 'Review Added Succesfully' });
  } catch (err) {
    console.error('Error creating service provider:', err);
    res.status(500).send('Internal Server Error');
  }
});

// PUT /edit review/:id
router.put('/:id', async (req, res) => {
    const {rev_description,service_id,rev_id } = req.body;
    let query = 'INSERT INTO review SET ';
    let values = [];
    if(rev_description){
      query += 'rev_description = ?, ';
      values.push(rev_description);
    }
    if (rev_id) {
      query += 'rev_id = ?, ';
      values.push(rev_id);
    }
    if (service_id) {
      query += 'service_id = ?, ';
      values.push(service_id);
    }
  
  // Remove the trailing comma and space
  connection.query(query,values, (err, results) => {
    if (results.affectedRows > 0) {
              res.json({ message: 'review updated successfully' });
            } else {
              res.status(404).json({ message: 'review not found' });
            }
    res.json(results);
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
    connection.query('DELETE FROM review WHERE rev_id = ?',[id], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('review deleted successfully' );
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
