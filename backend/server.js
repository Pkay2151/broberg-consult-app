const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authenticationRoute = require("./routes/authenticationRoute")



const app = express();
app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Welcome to the Broberg Consult API"); 
// })
app.use("/api/auth", authenticationRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
