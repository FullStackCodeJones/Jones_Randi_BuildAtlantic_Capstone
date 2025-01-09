//Program Resource Schema

const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eligibilityCriteria: { type: Date, default: Date.now },
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
