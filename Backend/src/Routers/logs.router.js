const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/router.middleware");
const { getUserLogs, deleteLog, getUserAllLogs } = require("../Controllers/logs.controller");

router.get("/logs", authMiddleware, getUserLogs);
router.get("/log-all", authMiddleware, getUserLogs, getUserAllLogs);
router.delete("/logs/:id", authMiddleware, deleteLog);

module.exports = router;