const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const prisma = new PrismaClient();

// Create a new employee with image upload
const createEmployee = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { name, position } = req.body;

  if (!name || !position) {
    return res.status(400).json({
      message: "Name and position are required",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Image file is required",
    });
  }

  try {
    // Generate the image URL
    const imageUrl = `/uploads/employees/${req.file.filename}`;

    const employee = await prisma.employee.create({
      data: {
        name,
        position,
        imageUrl,
        updatedBy: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    console.error("Error creating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update employee with optional image upload
const updateEmployee = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { id } = req.params;
  const { name, position } = req.body;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  try {
    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!existingEmployee) {
      // Delete uploaded file if employee doesn't exist
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return res.status(404).json({ error: "Employee not found" });
    }

    // Prepare update data
    const updateData = {
      updatedBy: userId,
    };

    if (name !== undefined) updateData.name = name;
    if (position !== undefined) updateData.position = position;

    // Handle image update
    if (req.file) {
      // Delete old image file
      if (existingEmployee.imageUrl) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          existingEmployee.imageUrl
        );
        fs.unlink(oldImagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting old image:", err);
          }
        });
      }

      // Set new image URL
      updateData.imageUrl = `/uploads/employees/${req.file.filename}`;
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    console.error("Error updating employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete employee and associated image
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  try {
    // Get employee to access image URL
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Delete employee from database
    await prisma.employee.delete({
      where: { id: Number(id) },
    });

    // Delete associated image file
    if (employee.imageUrl) {
      const imagePath = path.join(__dirname, "..", employee.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting image file:", err);
        }
      });
    }

    return res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get total employees count
const getTotalEmployees = async (req, res) => {
  try {
    const totalEmployees = await prisma.employee.count();
    return res.status(200).json({ total: totalEmployees });
  } catch (error) {
    console.error("Error fetching total employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const approveEmployee = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { isApproved: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.json({
      message: "Employee approved successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error approving employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  approveEmployee,
  deleteEmployee,
  getTotalEmployees,
};
