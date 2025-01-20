// Entry Point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User"); // Imports the User Schema
const authRoutes = require("./routes/authRoutes"); // Import Auth Routes
const programRoutes = require("./routes/programRoutes"); // Import Program Routes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit process if the database connection fails
  });

// Middleware configuration
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Build Atlantic API is Running!"));
app.use("/api/auth", authRoutes); // Register Auth Routes
app.use("/api/programs", programRoutes); // Register Program Routes

// Add Admin User When Server Starts
User.addAdminUser()
  .then(() => console.log("Admin user added (if not already present)."))
  .catch((error) => {
    console.error("Error adding admin user:", error.message);
  });

// Start the Server
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
