// const pool = require('../db');

// const getClients = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM clients');
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// const addClient = async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO clients (name, email) VALUES ($1, $2) RETURNING *',
//       [name, email]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };

// module.exports = {
//   getClients,
//   addClient,
// };
// // This code defines the clientController for handling client-related operations in the Broberg Consult application.
// // It includes functions to get all clients and add a new client to the database.
