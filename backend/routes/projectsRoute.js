const express = require("express");

const { uploadProject } = require("../middleware/upload.js");

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  totalProjects,
  approveProject,
} = require("../controllers/projectController.js");
const validateToken = require("../middleware/tokenVerification.js");

const router = express.Router();

// Public routes
router.get("/view", getProjects);

router.get("/total", totalProjects); // Add this before /:id to avoid conflicts
router.get("/:id", getProjectById);

// // Protected routes with file upload
router.patch("/approve/:id", validateToken, approveProject);
router.post("/", validateToken, uploadProject, createProject);
router.put("/:id", validateToken, uploadProject, updateProject);
router.delete("/:id", validateToken, deleteProject);

module.exports = router;
