// src/controllers/registerController.js
const User = require("../models/User"); // Import your User model

const registerControllers = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validation
      if (!name || !email || !password) {
        return res.status(400).send({ message: "All fields are required" });
      }

      // Create a new user instance
      const newUser = new User({ name, email, password });
      await newUser.save(); // Save to MongoDB

      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal server error", error });
    }
  },
};

module.exports = registerControllers;
