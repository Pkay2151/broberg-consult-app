const express = require("express");

const { uploadEmployee } = require("../middleware/upload.js"); // Make sure this path is correct

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getTotalEmployees,
  approveEmployee,
} = require("../controllers/employeeContorller.js");
const validateToken = require("../middleware/tokenVerification.js");

const router = express.Router();

// Public: View all employees
router.get("/view", getEmployees);
router.get("/active-employees", getTotalEmployees);

// Protected: Create, update, delete with file upload
router.patch("/approve/:id", validateToken, approveEmployee);
router.post("/create", validateToken, uploadEmployee, createEmployee);
router.put("/update/:id", validateToken, uploadEmployee, updateEmployee);
router.delete("/delete/:id", validateToken, deleteEmployee);

module.exports = router;
