const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middlewares/router.middleware");
const { getUserLogs, deleteLog, getUserAllLogs, getAllEnquiriesAdmin, getEnquiriesByCategory } = require("../Controllers/logs.controller");

router.get("/logs", authMiddleware, getUserLogs);
router.get("/log-all", authMiddleware, getUserLogs, getUserAllLogs);
router.get("/all-enquiries", authMiddleware, getAllEnquiriesAdmin);  // ✅ Any authenticated user can fetch all enquiries
router.get("/category/:category", authMiddleware, getEnquiriesByCategory);  // Get enquiries by category
router.delete("/logs/:id", authMiddleware, deleteLog);

module.exports = router;