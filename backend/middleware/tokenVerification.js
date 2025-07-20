const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
        return;
      }
      req.user = decoded; // <-- Save the whole decoded payload
      next();
    });
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }
});

module.exports = validateToken;
