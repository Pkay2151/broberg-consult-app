const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  getProjectsByClient,
} = require('../controllers/projectController');

// Get all projects
router.get('/', getProjects);

// Get a single project by ID
router.get('/:id', getProjectById);

// Add a new project
router.post('/', addProject);

// Update an existing project
router.put('/:id', updateProject);

// Delete a project
router.delete('/:id', deleteProject);

// Get projects by client name
router.get('/client/:clientName', getProjectsByClient);

module.exports = router;
