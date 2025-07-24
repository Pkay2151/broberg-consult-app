const express = require("express");
const { Router } = express;
const router = Router();

const validateToken = require("../middleware/tokenVerification.js");
const {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} = require("../controllers/projectController.js");

router.get("/view", getProjects);

router.post("/create", validateToken, createProject);

router.put("/update/:id", validateToken, updateProject);
router.delete("/delete/:id", validateToken, deleteProject);

module.exports = router;
