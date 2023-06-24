// serviceProviders.js (Route file)

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
uuidv4();
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
// GET /service-providers
module.exports = (connection) => {
router.get('/',  (req, res) => {
    // connection.query('SELECT service.*, service_provider.name AS provider_name FROM service INNER JOIN service_provider ON service.serviceprovider_id = service_provider.serviceprovider_id', (err, results) => {
    connection.query('SELECT * FROM service ', (err, results) => {
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
  console.log(id);
connection.query('SELECT * FROM service WHERE service_id= ?',[id], (err, results) => {
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
router.post('/',upload.single('Service_Pic'), async (req, res) => {
  const {serviceprovider_id ,charges,title,description} = req.body;
  let query = 'INSERT INTO service SET ';
  let values = [];

  if (serviceprovider_id) {
    query += 'serviceprovider_id = ?, ';
    values.push(serviceprovider_id);
  }
  if (charges) {
    query += 'charges = ?, ';
    values.push(charges);
  }
  if (title) {
    query += 'title = ?, ';
    values.push(title);
  }
  if (description) {
    query += 'description = ?, ';
    values.push(description);
  }
  console.log(req.file)
  if (req.file) {
    query += "images = ?, ";
    const imgsrc="http://localhost:3000/public/"  + req.file.filename
    values.push(imgsrc);
  }

  // Remove the trailing comma and space
  query = query.slice(0, -2);
  try {
    await connection.query(query,values);
    res.status(201).json({ message: 'Service  created successfully' });
  } catch (err) {
    console.error('Error creating service provider:', err);
    res.status(500).send('Internal Server Error');
  }
});

// // PUT /service-providers/:id
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const {experience,service_name,availability_hours,change_per_hour,number_of_orders_completed,rating } = req.body;
//   let query = 'UPDATE service_provider SET ';
//   let values = [];

//   if (experience) {
//     query += 'experience = ?, ';
//     values.push(experience);
//   }
//   if (service_name) {
//     query += 'service_name = ?, ';
//     values.push(service_name);
//   }
//   if (availability_hours) {
//     query += 'availability_hours = ?, ';
//     values.push(availability_hours);
//   }
//   if (change_per_hour) {
//     query += 'change_per_hour = ?, ';
//     values.push(change_per_hour);
//   }
//   if (number_of_orders_completed) {
//     query += 'number_of_orders_completed = ?, ';
//     values.push(number_of_orders_completed);
//   }

//   if (rating) {
//     query += 'rating = ?, ';
//     values.push(rating);
//   }
//   query = query.slice(0, -2);
// query+='WHERE serviceprovider_id = ?'
// values.push(id)
//   // Remove the trailing comma and space
//   connection.query(query,values, (err, results) => {
//     if (results.affectedRows > 0) {
//               res.json({ message: 'Service provider updated successfully' });
//             } else {
//               res.status(404).json({ message: 'Service provider not found' });
//             }
//     // res.json(results);
//   });
// //   try {
// //     const result = await connection.query(query,values);
// //     if (result.affectedRows > 0) {
// //       res.json({ message: 'Service provider updated successfully' });
// //     } else {
// //       res.status(404).json({ message: 'Service provider not found' });
// //     }
// //   } catch (err) {
// //     console.error('Error updating service provider:', err);
// //     res.status(500).send('Internal Server Error');
// //   }
// });

// DELETE /service-providers/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
//   try {
    // const result = await connection.query('DELETE FROM service_provider WHERE serviceprovider_id = ?', [id]);
    connection.query('DELETE FROM service WHERE service_id = ?',[id], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).send('Service  deleted successfully' );
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
