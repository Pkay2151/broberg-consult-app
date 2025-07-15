const express = require("express");
const {
  registerUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authenticationController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

module.exports = router;
