const userProblems = require("../models/userProblems.model");

const getUserLogs = async (req, res) => {
  try {
   
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email not found"
      });
    }

    // Fetch user logs from MongoDB
    const logs = await userProblems
      .find({ email: userEmail.toLowerCase() })
      .select("email category location description Emergency status createdAt")
      .sort({ createdAt: -1 });

    // Format response
    const formattedLogs = logs.map((item) => ({
      _id: item._id,
      id: item._id,
      email: item.email,
      category: item.category || 'general',
      location: item.location,
      description: item.description,
      Emergency: item.Emergency,
      status: item.status || 'pending',
      createdAt: item.createdAt,
    }));

    res.status(200).json({ 
      success: true,
      logs: formattedLogs,
      total: formattedLogs.length
    });
  } catch (error) {
    console.error("Get logs error:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch logs. Please try again later." 
    });
  }
};

const getUserAllLogs = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email not found"
      });
    }

    // Fetch user logs with limit
    const logs = await userProblems
      .find({ email: userEmail.toLowerCase() })
      .select("email category location description Emergency status createdAt")
      .sort({ createdAt: -1 })
      .limit(50);  // Increased limit to 50

    const formattedLogs = logs.map((item) => ({
      _id: item._id,
      id: item._id,
      email: item.email,
      category: item.category || 'general',
      location: item.location,
      description: item.description,
      Emergency: item.Emergency,
      status: item.status || 'pending',
      createdAt: item.createdAt,
    }));

    res.status(200).json({ 
      success: true,
      logs: formattedLogs,
      total: formattedLogs.length
    });
  } catch (error) {
    console.error("Get all logs error:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch logs. Please try again later." 
    });
  }
};

const getAllEnquiriesAdmin = async (req, res) => {
  try {
   
    const logs = await userProblems
      .find({})
      .select("email category location description Emergency status createdAt")
      .sort({ createdAt: -1 })
      .limit(500); 

    const formattedLogs = logs.map((item) => ({
      _id: item._id,
      id: item._id,
      email: item.email,
      category: item.category || 'general',
      location: item.location,
      description: item.description,
      Emergency: item.Emergency,
      status: item.status || 'pending',
      createdAt: item.createdAt,
    }));

    // Get total count
    const totalCount = await userProblems.countDocuments({});

    res.status(200).json({ 
      success: true,
      logs: formattedLogs,
      total: totalCount,
      returned: formattedLogs.length
    });
  } catch (error) {
    console.error("Get all enquiries error:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch enquiries. Please try again later." 
    });
  }
};

const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Log ID is required"
      });
    }

    // Find log in MongoDB
    const log = await userProblems.findById(id);
    if (!log) {
      return res.status(404).json({ 
        success: false,
        message: "Enquiry not found" 
      });
    }

   
    if (log.email.toLowerCase() !== userEmail.toLowerCase()) {
      return res.status(403).json({ 
        success: false,
        message: "Unauthorized: You can only delete your own enquiries" 
      });
    }

    // Delete from MongoDB
    await userProblems.findByIdAndDelete(id);
    
    res.status(200).json({ 
      success: true,
      message: "Enquiry deleted successfully" 
    });
  } catch (error) {
    console.error("Delete log error:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to delete enquiry. Please try again later." 
    });
  }
};

const getEnquiriesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }


    const logs = await userProblems
      .find({ category: { $regex: category, $options: "i" } })
      .select("email category location description Emergency status createdAt")
      .sort({ createdAt: -1 });

    const formattedLogs = logs.map((item) => ({
      _id: item._id,
      id: item._id,
      email: item.email,
      category: item.category || 'general',
      location: item.location,
      description: item.description,
      Emergency: item.Emergency,
      status: item.status || 'pending',
      createdAt: item.createdAt,
    }));

    res.status(200).json({ 
      success: true,
      logs: formattedLogs,
      total: formattedLogs.length,
      category: category
    });
  } catch (error) {
    console.error("Get enquiries by category error:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch enquiries by category. Please try again later." 
    });
  }
};


const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enquiry ID is required"
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    // Validate status value
    const validStatuses = ["pending", "in-progress", "resolved", "closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid statuses: ${validStatuses.join(", ")}`
      });
    }

    // Find and update enquiry
    const updatedEnquiry = await userProblems.findByIdAndUpdate(
      id,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `Enquiry status updated to ${status}`,
      enquiry: {
        _id: updatedEnquiry._id,
        id: updatedEnquiry._id,
        email: updatedEnquiry.email,
        category: updatedEnquiry.category,
        location: updatedEnquiry.location,
        description: updatedEnquiry.description,
        Emergency: updatedEnquiry.Emergency,
        status: updatedEnquiry.status,
        createdAt: updatedEnquiry.createdAt
      }
    });
  } catch (error) {
    console.error("Update enquiry status error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update enquiry status. Please try again later."
    });
  }
};

module.exports = { getUserLogs, deleteLog, getUserAllLogs, getAllEnquiriesAdmin, getEnquiriesByCategory, updateEnquiryStatus };