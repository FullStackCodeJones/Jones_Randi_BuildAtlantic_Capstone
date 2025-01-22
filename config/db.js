// MongoDB Connection Logic
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "BuildAtlantic",
    });
    console.log("MongoDB Connected Successfully.");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
