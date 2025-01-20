const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure this import is correct
const adminControllers = require("../controllers/adminControllers");

// The Middleware To Verify Token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // This extracts the token from Authorization header
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No Token Provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies the token
    req.user = decoded; // Attach the decoded user data to the request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token." });
  }
}

// Middleware To Check The Admins Role
function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access Denied. Build Atlantic Admins Only." });
  }
  next();
}

module.exports = { authenticateToken, authorizeAdmin };
