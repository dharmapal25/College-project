const express = require("express");
const authRouters = express.Router();

const { register, login, adminLogin, logout, officerLogin, refreshAccessToken } = require("../Controllers/auth.controller");
const { authMiddleware, adminMiddleware } = require("../middlewares/router.middleware");

// ✅ Health check
authRouters.get("/", (req, res) => {
    res.json({ message: "Auth API running" });
});

// ✅ User Authentication
authRouters.post("/register", register);
authRouters.post("/login", login);

// ✅ Admin Authentication
authRouters.post("/admin-login", adminLogin);

// ✅ Officer Authentication
authRouters.post("/officers-login", officerLogin);

// ✅ Token Refresh
authRouters.post("/refresh-token", refreshAccessToken);

// ✅ Logout
authRouters.post("/logout", logout);

// ✅ Protected Routes Example
authRouters.get("/profile", authMiddleware, (req, res) => {
    res.json({ success: true, user: req.user });
});

module.exports = authRouters;