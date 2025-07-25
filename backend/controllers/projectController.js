const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
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

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByClient,
  getProjectsByDateRange,
};
