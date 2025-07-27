const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const pendingApprovals = async (req, res) => {
  try {
    // Count pending projects (isApproved: false)
    const pendingProjects = await prisma.project.count({
      where: {
        isApproved: false,
      },
    });

    // Count pending employees (isApproved: false)
    const pendingEmployees = await prisma.employee.count({
      where: {
        isApproved: false,
      },
    });

    // Return the counts
    res.json({
      projects: pendingProjects,
      employees: pendingEmployees,
      total: pendingProjects + pendingEmployees,
    });
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get detailed pending items (optional - for admin dashboard)
const getPendingDetails = async (req, res) => {
  try {
    // Get pending projects with details
    const pendingProjects = await prisma.project.findMany({
      where: {
        isApproved: false,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get pending employees with details
    const pendingEmployees = await prisma.employee.findMany({
      where: {
        isApproved: false,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      projects: {
        count: pendingProjects.length,
        items: pendingProjects,
      },
      employees: {
        count: pendingEmployees.length,
        items: pendingEmployees,
      },
      total: pendingProjects.length + pendingEmployees.length,
    });
  } catch (error) {
    console.error("Error fetching pending details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get pending summary for dashboard
const getPendingSummary = async (req, res) => {
  try {
    const [projectCount, employeeCount] = await Promise.all([
      prisma.project.count({
        where: { isApproved: false },
      }),
      prisma.employee.count({
        where: { isApproved: false },
      }),
    ]);

    res.json({
      pending: {
        projects: projectCount,
        employees: employeeCount,
        total: projectCount + employeeCount,
      },
      approved: {
        projects: await prisma.project.count({ where: { isApproved: true } }),
        employees: await prisma.employee.count({ where: { isApproved: true } }),
      },
    });
  } catch (error) {
    console.error("Error fetching pending summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  pendingApprovals,
  getPendingDetails,
  getPendingSummary,
};
