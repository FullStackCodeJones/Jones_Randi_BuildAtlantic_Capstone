const User = require("../models/User");

const createAdminUser = async (req, res) => {
  try {
    // This is to check if an admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin User Already Exists." });
    }

    // Extract Data From Request Body
    const { name, email, password, role } = req.body;

    // Create a new Admin User
    const newAdmin = new User({ name, email, password, role });
    await newAdmin.save();

    res.status(201).json({ message: "Admin User Added" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Adding Admin User", error: err.message });
  }
};

module.exports = { createAdminUser };
