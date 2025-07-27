const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      // where: { isApproved: true }, // Only fetch approved projects
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
      where: { id: Number(id) }, // Only fetch approved project
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

// Add a new project
const createProject = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { name, clientName, description, imageUrl, startDate, endDate } =
    req.body;

  // Validate required fields
  if (!name || !clientName || !startDate) {
    return res.status(400).json({
      error: "Project name, client name, and start date are required",
    });
  }

  try {
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
    console.error("Error adding project:", err);
    res.status(500).json({ error: "Server error while adding project" });
  }
};

// Update an existing project
const updateProject = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { id } = req.params;
  const { name, clientName, description, imageUrl, startDate, endDate } =
    req.body;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  try {
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Prepare update data - only include fields that are provided
    const updateData = {
      updatedBy: userId,
    };

    if (name !== undefined) updateData.name = name;
    if (clientName !== undefined) updateData.clientName = clientName;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined)
      updateData.endDate = endDate ? new Date(endDate) : null;

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
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Server error while updating project" });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  try {
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    await prisma.project.delete({
      where: { id: Number(id) },
    });

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
          mode: "insensitive", // Case-insensitive search
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

  // Check if user is admin
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

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update project approval status
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

  // Check if user is admin
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

    const { status } = req.query; // ?status=approved or ?status=pending

    let whereClause = {};

    if (status === "approved") {
      whereClause.isApproved = true;
    } else if (status === "pending") {
      whereClause.isApproved = false;
    }
    // If no status specified, return all projects

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

// Helper function to check admin status (reusable)
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
