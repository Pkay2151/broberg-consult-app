const express = require('express');
const router = express.Router();
const {
  getClients,
  addClient,
} = require('../controllers/clientController');

router.get('/', getClients);
router.post('/', addClient);

module.exports = router;
// This code defines the routes for handling client-related requests in the backend of the Broberg Consult application.
// It imports the necessary modules, sets up the router, and defines the routes for getting and