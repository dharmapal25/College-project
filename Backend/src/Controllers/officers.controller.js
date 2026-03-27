const usersInfo = require("../models/users.model");
const AllOfficers = require("../models/allOfficers.model");
const bcrypt = require("bcrypt");

const getOfficers = async (req, res) => {
  try {
    // fetch from allOfficers collection
    const officers = await AllOfficers.find({}).select("-password");

    const formatted = officers.map((officer) => ({
      id: officer._id,
      email: officer.email,
      category: officer.category || "other",
      name: officer.username || "Officer",
      image: `https://i.pravatar.cc/150?u=${encodeURIComponent(officer.email)}`,
      phone: officer.Phone,
    }));

    res.status(200).json({ officers: formatted });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch officers" });
  }
};


const addOfficer = async (req, res) => {
  try {
    const { username, email, password, phone, category } = req.body;

    // Validation
    if (!username || !email || !password || !phone || !category) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if email already exists
    const existingOfficer = await AllOfficers.findOne({ email });
    if (existingOfficer) {
      return res.status(400).json({
        message: "Email is already registered"
      });
    }

    // Check if phone already exists
    const existingPhone = await AllOfficers.findOne({ Phone: phone });
    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number is already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new officer
    const newOfficer = await AllOfficers.create({
      username,
      email,
      password: hashedPassword,
      Phone: phone,
      category
    });

    res.status(201).json({
      message: "Officer added successfully",
      officer: {
        id: newOfficer._id,
        email: newOfficer.email,
        name: newOfficer.username,
        category: newOfficer.category,
        phone: newOfficer.Phone
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to add officer"
    });
  }
};



module.exports = { getOfficers, addOfficer };