const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path")
const projectRoute =require("./routes/projectsRoute")
const employeeRoute = require("./routes/employeeRoute");
const pendingApprovalRoute = require("./routes/pendingApprovalRoute");
const authenticationRoute = require("./routes/authenticationRoute")



const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authenticationRoute)
app.use("/api/projects", projectRoute)
app.use(express.json());

// ✅ CRITICAL: Serve static files BEFORE routes and WITHOUT /api prefix
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authenticationRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/projects", projectRoute);
app.use("/api/", pendingApprovalRoute); // ✅ Use proper route file


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served at: http://localhost:${PORT}/uploads`)
});
