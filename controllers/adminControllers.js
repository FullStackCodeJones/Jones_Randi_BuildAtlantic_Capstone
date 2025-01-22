const User = require("../models/User");
const bcrypt = require("bcrypt");

const createAdminUser = async (req, res) => {
  try {
    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin User Already Exists." });
    }

    // Extract Data From Request Body
    const { name, email, password, role = "admin" } = req.body; // Default role to 'admin'

    // Create a new Admin User
    const newAdmin = new User({
      name,
      email,
      password,
      role,
    });

    // Hash the password before saving it to the database
    newAdmin.password = await bcrypt.hash(password, 10); // 10 is salt round

    await newAdmin.save();

    res.status(201).json({ message: "Admin User Added" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Adding Admin User", error: err.message });
  }
};

module.exports = { createAdminUser };
