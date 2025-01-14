const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust this import based on your project structure

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

// Admin User Creation on Startup
module.exports.addAdminUser = async function () {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const adminUser = new User({
      name: "Randi Jones",
      email: "admin@example.com",
      password: process.env.ADMIN_PASSWORD, // Securely fetch from environment variable
      role: "admin",
    });

    const result = await adminUser.save();
    console.log("Admin User Added", result);
  } catch (err) {
    console.error("Error Adding Admin User", err.message);
  }
};

module.exports = { authenticateToken, authorizeAdmin, addAdminUser };
