const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new employee
const createEmployee = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const { name, imageUrl, position } = req.body;
  if (!name || !imageUrl || !position) {
    return res
      .status(400)
      .json({ message: "Name, imageUrl, and position are required" });
  }
  try {
    const employee = await prisma.employee.create({
      data: { name, imageUrl, position, updatedBy: userId },
    });
    return res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    return res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update an employee by ID
const updateEmployee = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }
  const { name, imageUrl, position } = req.body;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { name, imageUrl, position, updatedBy: userId },
    });
    return res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an employee by ID
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await prisma.employee.delete({ where: { id: Number(id) } });
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
