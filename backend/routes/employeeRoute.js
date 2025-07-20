const express = require("express");
const validateToken = require("../middleware/tokenVerification.js");

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeContorller.js");
const router = express.Router();

// Public: View all employees
router.get("/view", getEmployees);

// Protected: Create, update, delete
router.post("/create", validateToken, createEmployee);
router.put("/update/:id", validateToken, updateEmployee);
router.delete("/delete/:id", validateToken, deleteEmployee);

module.exports = router;
