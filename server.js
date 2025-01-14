// Entry Point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User"); // Imports The User Schema

const app = express();
const PORT = process.env.PORT || 5000;
//Backend/Controllers/adminControllers
// Connect to MongoDB database
connectDB().catch((error) => {
  console.error("Failed to connect to MongoDB:", error.message);
  process.exit(1); // Exit process if the database connection fails
});

// Middleware configuration
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Build Atlantic API is Running!"));

const programRoutes = require("./routes/programRoutes");
app.use("/api/programs", programRoutes); // Register Program Routes

// Adds Admin User When Server Starts
User.addAdminUser().catch((error) => {
  console.error("Error adding admin user:", error.message);
});

// Starts The Server
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
