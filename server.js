const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path")
const projectRoute =require("./routes/projectsRoute")

const authenticationRoute = require("./routes/authenticationRoute")



const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/auth", authenticationRoute)
app.use("/api/projects", projectRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served at: http://localhost:${PORT}/uploads`)
});
