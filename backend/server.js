const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const authenticationRoute = require("./routes/authenticationRoute");
const employeeRoute = require("./routes/employeeRoute");
const projectRoute = require("./routes/projectsRoute");
const { pendingApprovals } = require("./controllers/pendingApproval");

// Import UploadThing

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Your existing routes

app.use("/api/auth", authenticationRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/projects", projectRoute);
app.use("/api/", pendingApprovals);

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
