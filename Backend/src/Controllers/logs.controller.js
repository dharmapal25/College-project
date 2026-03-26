const userProblems = require("../models/userProblems.model");

const getUserLogs = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Use lean() for faster read-only queries
    const logs = await userProblems
      .find({ email: userEmail })
      .select("email location description Emergency status createdAt")
      .sort({ createdAt: -1 })
      .lean()
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await userProblems.countDocuments({ email: userEmail });

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

    res.set('Cache-Control', 'private, max-age=300'); // Cache for 5 minutes
    res.status(200).json({ 
      logs: formattedLogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch logs" });
  }
};
const getUserAllLogs = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const logs = await userProblems
      .find({ email: userEmail })
      .select("email location description Emergency status createdAt")
      .sort({ createdAt: -1 })
      .lean()
      .skip(skip)
      .limit(limit);

    const total = await userProblems.countDocuments({ email: userEmail });

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

    res.set('Cache-Control', 'private, max-age=300');
    res.status(200).json({ 
      logs: formattedLogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch logs" });
  }
};

const getAllEnquiriesAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { status, category } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const logs = await userProblems
      .find(filter)
      .select("email location description Emergency status category createdAt")
      .sort({ createdAt: -1 })
      .lean()
      .skip(skip)
      .limit(limit);

    const total = await userProblems.countDocuments(filter);

    const formattedLogs = logs.map((item) => ({
      id: item._id,
      email: item.email,
      category: item.category || 'other',
      location: item.location,
      description: item.description,
      Emergency: item.Emergency,
      status: item.status || 'pending',
      createdAt: item.createdAt,
    }));

    res.set('Cache-Control', 'private, max-age=300');
    res.status(200).json({ 
      logs: formattedLogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch enquiries" });
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

module.exports = { getUserLogs, deleteLog, getUserAllLogs, getAllEnquiriesAdmin };