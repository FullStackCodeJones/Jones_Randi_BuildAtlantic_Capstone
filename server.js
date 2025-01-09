// Entry Point
require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();

// Middleware configuration

app.use(cors());
app.use(express.json());

//Routes

app.get("/", (req, res) => res.send("Build Atlantic API is Running!"));

const programRoutes = require("./routes/programRoutes");
app.use("/api/programs", programRoutes); // Register Program Routes

//Starts The Server

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
