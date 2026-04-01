const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const prisma = new PrismaClient();

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
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

    res.json({
      message: "Projects retrieved successfully",
      count: projects.length,
      projects,
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error while fetching projects" });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
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

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ error: "Server error while fetching project" });
  }
};

// Create a new project with image upload
const createProject = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // 🔍 DEBUG: Log what we're receiving
  console.log("=== PROJECT CREATION DEBUG ===");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("Content-Type:", req.get("content-type"));
  console.log("==============================");

  const { name, clientName, description, startDate, endDate } = req.body;

  // Validate required fields
  if (!name || !clientName || !startDate) {
    return res.status(400).json({
      error: "Project name, client name, and start date are required",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Project image is required",
    });
  }

  try {
    // Generate the image URL
    const imageUrl = `/uploads/projects/${req.file.filename}`;

    console.log("Project image saved at:", imageUrl); // DEBUG

    const project = await prisma.project.create({
      data: {
        name,
        clientName,
        description,
        imageUrl,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
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

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      fs.unlink(req.file.path, (deleteErr) => {
        if (deleteErr) console.error("Error deleting file:", deleteErr);
      });
    }

    console.error("Error adding project:", err);
    res.status(500).json({ error: "Server error while adding project" });
  }
};

// Update an existing project with optional image upload
const updateProject = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { id } = req.params;
  const { name, clientName, description, startDate, endDate } = req.body;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  try {
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProject) {
      // Delete uploaded file if project doesn't exist
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return res.status(404).json({ error: "Project not found" });
    }

    // Prepare update data
    const updateData = {
      updatedBy: userId,
    };

    if (name !== undefined) updateData.name = name;
    if (clientName !== undefined) updateData.clientName = clientName;
    if (description !== undefined) updateData.description = description;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined)
      updateData.endDate = endDate ? new Date(endDate) : null;

    // Handle image update
    if (req.file) {
      // Delete old image file
      if (existingProject.imageUrl) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          existingProject.imageUrl
        );
        fs.unlink(oldImagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting old image:", err);
          }
        });
      }

      // Set new image URL
      updateData.imageUrl = `/uploads/projects/${req.file.filename}`;
      console.log("New project image saved at:", updateData.imageUrl); // DEBUG
    }

    const updatedProject = await prisma.project.update({
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

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      fs.unlink(req.file.path, (deleteErr) => {
        if (deleteErr) console.error("Error deleting file:", deleteErr);
      });
    }

    console.error("Error updating project:", err);
    res.status(500).json({ error: "Server error while updating project" });
  }
};

// Delete a project and associated image
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  try {
    // Get project to access image URL
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Delete project from database
    await prisma.project.delete({
      where: { id: Number(id) },
    });

    // Delete associated image file
    if (project.imageUrl) {
      const imagePath = path.join(__dirname, "..", project.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting image file:", err);
        }
      });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Server error while deleting project" });
  }
};

// Get projects by client name
const getProjectsByClient = async (req, res) => {
  const { clientName } = req.params;

  if (!clientName) {
    return res.status(400).json({ error: "Client name is required" });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        clientName: {
          contains: clientName,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
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

    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects by client:", err);
    res
      .status(500)
      .json({ error: "Server error while fetching projects by client" });
  }
};

// Get projects by date range
const getProjectsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const whereClause = {};

    if (startDate) {
      whereClause.startDate = {
        gte: new Date(startDate),
      };
    }

    if (endDate) {
      whereClause.endDate = {
        lte: new Date(endDate),
      };
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
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

    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects by date range:", err);
    res
      .status(500)
      .json({ error: "Server error while fetching projects by date range" });
  }
};

// Admin: Approve/Reject Project Status
const updateProjectApprovalStatus = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { id } = req.params;
    const { isApproved } = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    if (typeof isApproved !== "boolean") {
      return res.status(400).json({
        error: "isApproved must be a boolean value (true or false)",
      });
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        isApproved: isApproved,
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

    const statusMessage = isApproved ? "approved" : "rejected";

    res.json({
      message: `Project ${statusMessage} successfully`,
      project: updatedProject,
    });
  } catch (err) {
    console.error("Error updating project approval status:", err);
    res.status(500).json({
      error: "Server error while updating project approval status",
    });
  }
};

// Get all projects with approval status filter (Admin only)
const getProjectsByApprovalStatus = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { status } = req.query;

    let whereClause = {};

    if (status === "approved") {
      whereClause.isApproved = true;
    } else if (status === "pending") {
      whereClause.isApproved = false;
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
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

    res.json({
      message: `Projects ${
        status ? `with ${status} status` : "all"
      } retrieved successfully`,
      count: projects.length,
      projects,
    });
  } catch (err) {
    console.error("Error fetching projects by approval status:", err);
    res.status(500).json({
      error: "Server error while fetching projects by approval status",
    });
  }
};

// Helper function to check admin status
const checkAdminStatus = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });
  return user?.isAdmin || false;
};

const totalProjects = async (req, res) => {
  try {
    const totalProjects = await prisma.project.count({
      where: { isApproved: true },
    });
    res.json({ total: totalProjects });
  } catch (error) {
    console.error("Error fetching total projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approveProject = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  try {
    const updatedProject = await prisma.project.update({
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
      message: "Project approved successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error approving project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByClient,
  getProjectsByDateRange,
  updateProjectApprovalStatus,
  getProjectsByApprovalStatus,
  checkAdminStatus,
  totalProjects,
  approveProject,
};
