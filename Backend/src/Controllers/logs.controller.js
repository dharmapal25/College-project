const userProblems = require("../models/userProblems.model");

const getUserLogs = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const logs = await userProblems
      .find({ email: userEmail })
      .select("email location description Emergency status createdAt")
      .sort({ createdAt: -1 });

    const formattedLogs = logs.map((item) => ({
      id: item._id,
      email: item.email,
      category: item.status || 'pending',
      location: item.location,
      description: item.description,
      Emergency: item.Emergency,
      status: item.status || 'pending',
      createdAt: item.createdAt,
    }));

    res.status(200).json({ logs: formattedLogs });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch logs" });
  }
};
const getUserAllLogs = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const logs = await userProblems.find({ email: userEmail })  // ✅ filter by user
      .select("email location description Emergency status createdAt")
      .sort({ createdAt: -1 }).limit(20);  // ✅ 20 records

    const formattedLogs = logs.map((item) => ({
      id: item._id,
      email: item.email,
      category: item.status || 'pending',
      location: item.location,
      description: item.description,
      Emergency: item.Emergency,
      status: item.status || 'pending',
      createdAt: item.createdAt,
    }));

    res.status(200).json({ logs: formattedLogs });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch logs" });
  }
};

const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;

    const log = await userProblems.findById(id);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    if (log.email !== req.user.email) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await userProblems.findByIdAndDelete(id);
    res.status(200).json({ message: "Log deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete log" });
  }
};

module.exports = { getUserLogs, deleteLog, getUserAllLogs };