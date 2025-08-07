const express = require("express");
const validateToken = require("../middleware/tokenVerification.js");
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

const router = express.Router();

// Public routes
router.get("/view", getProjects);
router.get("/", getProjects);
router.get("/total", totalProjects);
router.get("/:id", getProjectById);

// Protected routes with file upload
router.post("/create", validateToken, uploadProject, createProject);
router.put("/update/:id", validateToken, uploadProject, updateProject);
router.delete("/delete/:id", validateToken, deleteProject);
router.patch("/approve/:id", validateToken, approveProject);

module.exports = router;
