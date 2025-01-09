const express = require("express");
const Program = require("../models/Program"); // Check model name
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/authMiddleware");
const router = express.Router();

// GET all programs
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching programs", error });
    console.error(error); // Optional: for debugging
  }
});

// GET program by ID
router.get("/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Error fetching program", error });
    console.error(error); // Optional: for debugging
  }
});

// POST create new program
router.post("/", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, description, eligibilityCriteria } = req.body;
    if (!title || !description || !eligibilityCriteria) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProgram = new Program({ title, description, eligibilityCriteria });
    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  } catch (error) {
    res.status(500).json({ message: "Error creating program", error });
    console.error(error); // Optional: for debugging
  }
});

// PUT update program by ID
router.put("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, description, eligibilityCriteria } = req.body;
    if (!title || !description || !eligibilityCriteria) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      { title, description, eligibilityCriteria },
      { new: true, runValidators: true }
    );
    if (!updatedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: "Error updating program", error });
    console.error(error); // Optional: for debugging
  }
});

// DELETE program by ID
router.delete("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const deletedProgram = await Program.findByIdAndDelete(req.params.id);
    if (!deletedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting program", error });
    console.error(error); // Optional: for debugging
  }
});

module.exports = router;
