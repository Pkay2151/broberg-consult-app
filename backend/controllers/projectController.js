const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new project
const createProject = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const { name, description, imageUrl, clientName, startDate, endDate } =
    req.body;

  if (
    !name ||
    !description ||
    !imageUrl ||
    !clientName ||
    !startDate ||
    !endDate
  ) {
    return res.status(400).json({
      message:
        "name, description, imageUrl, clientName, startDate, and endDate are required",
    });
  }
  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        imageUrl,
        clientName,
        startDate,
        endDate,
        updatedBy: userId,
      },
    });
    return res
      .status(201)
      .json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a project by ID
const updateProject = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid project ID" });
  }
  const { name, description, imageUrl, clientName, startDate, endDate } =
    req.body;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        imageUrl,
        clientName,
        startDate,
        endDate,
        updatedBy: userId,
      },
    });
    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a project by ID
const deleteProject = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await prisma.project.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
