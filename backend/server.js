const express = require("express");
const cors = require("cors");
require("dotenv").config();
const employeeRoutes = require("./routes/employeeRoute.js");
const projectsRoute = require("./routes/projectsRoute.js");
const authenticationRoute = require("./routes/authenticationRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authenticationRoute);
app.use("/api/employee", employeeRoutes);
app.use("/api/projects", projectsRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
