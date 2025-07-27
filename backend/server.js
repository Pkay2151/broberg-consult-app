const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const authenticationRoute = require("./routes/authenticationRoute");
const employeeRoute = require("./routes/employeeRoute");
const projectRoute = require("./routes/projectsRoute");
const pendingApprovalRoute = require("./routes/pendingApprovalRoute"); // ✅ Import route, not controller

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ CRITICAL: Serve static files BEFORE routes and WITHOUT /api prefix
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authenticationRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/projects", projectRoute);
app.use("/api/admin", pendingApprovalRoute); // ✅ Use proper route file

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Broberg Consult API is running!" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served at: http://localhost:${PORT}/uploads`);
});
