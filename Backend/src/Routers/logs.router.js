const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middlewares/router.middleware");
const { getUserLogs, deleteLog, getUserAllLogs, getAllEnquiriesAdmin, getEnquiriesByCategory, updateEnquiryStatus } = require("../Controllers/logs.controller");

router.get("/logs", authMiddleware, getUserLogs);
router.get("/log-all", authMiddleware, getUserLogs, getUserAllLogs);
router.get("/all-enquiries", authMiddleware, getAllEnquiriesAdmin);  
router.get("/category/:category", authMiddleware, getEnquiriesByCategory);  // Get enquiries by category
router.put("/logs/:id/status", authMiddleware, updateEnquiryStatus);  // Update enquiry status
router.delete("/logs/:id", authMiddleware, deleteLog);

module.exports = router;