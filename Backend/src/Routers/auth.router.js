const express = require("express");
const authRouters = express.Router();

const { register, login, adminLogin, logout, officerLogin } = require("../Controllers/auth.controller");
const { authMiddleware, adminMiddleware } = require("../middlewares/router.middleware");

authRouters.get("/", (req, res) => {
    res.json({ message: "Auth API running" });
});

// User Authentication
authRouters.post("/register", register);
authRouters.post("/login", login);

// Admin/Officer Authentication (NO middleware - direct login)
authRouters.post("/admin-login", adminLogin);

// Officer Authentication
authRouters.post("/officers-login", officerLogin);

// Logout
authRouters.post("/logout", logout);

// Protected Routes Example
authRouters.get("/profile", authMiddleware, (req, res) => {
    res.json({ success: true, user: req.user });
});

module.exports = authRouters;