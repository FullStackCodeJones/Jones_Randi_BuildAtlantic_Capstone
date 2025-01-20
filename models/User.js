// User Schema
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables from .env file

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password hasn't been modified
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// The Function to Add an Admin User to the database using environment variable for the password
module.exports.addAdminUser = async function () {
  try {
    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const adminUser = new User({
      name: "Randi Jones",
      email: "admin@example.com",
      password: process.env.ADMIN_PASSWORD, // Using the environment variable securely
      role: "admin",
    });

    const result = await adminUser.save();
    console.log("Admin User Added", result);
  } catch (err) {
    console.error("Error Adding Admin User", err);
  }
};
