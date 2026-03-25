const usersInfo = require("../models/users.model");

const getOfficers = async (req, res) => {
  try {
    // fetch admins (officers) from users collection
    const query = { role: "admin" };

    const officers = await usersInfo.find(query).select("email username lastname role");

    const formatted = officers.map((officer) => ({
      id: officer._id,
      email: officer.email,
      category: officer.role || "admin",
      name: officer.username ? `${officer.username} ${officer.lastname}`.trim() : "Officer",
      image: `https://i.pravatar.cc/150?u=${encodeURIComponent(officer.email)}`,
    }));

    res.status(200).json({ officers: formatted });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch officers" });
  }
};

module.exports = { getOfficers };