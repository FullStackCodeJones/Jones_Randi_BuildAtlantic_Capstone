const User = require("..models/User");

const createAdminUser = async (requestAnimationFrame, res) => {
  try {
    //This is to check if an admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin User Already Exists." });
    }

    //Extract Data From REquest Body

    const { name, email, password, role } = requestAnimationFrame.body;

    //Create a new Admin User
    const newAdmin = new User({ name, email, password, role });
    await newAdmin.save();

    response.status(201).json({ message: "Admin User Added" });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Error Adding Admin USer", error: err.message });
  }
};

module.exports = { createAdminUser };
