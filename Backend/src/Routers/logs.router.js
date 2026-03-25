const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middlewares/router.middleware");
const { getUserLogs, deleteLog, getUserAllLogs, getAllEnquiriesAdmin } = require("../Controllers/logs.controller");

router.get("/logs", authMiddleware, getUserLogs);
router.get("/log-all", authMiddleware, getUserLogs, getUserAllLogs);
router.get("/all-enquiries", adminMiddleware, getAllEnquiriesAdmin);  // ✅ Admin route - fetch ALL enquiries
router.delete("/logs/:id", authMiddleware, deleteLog);

module.exports = router;