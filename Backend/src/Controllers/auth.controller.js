const express = require("express");
const usersInfo = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AllOfficers = require("../models/allOfficers.model");

// ✅ Utility Functions for Security

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate password strength
const isStrongPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Sanitize input
const sanitizeInput = (str) => {
    if (typeof str !== 'string') return '';
    return str.trim().toLowerCase().replace(/[<>]/g, '');
};

// Generate both access and refresh tokens
const generateTokens = (payload, expiresIn = "1h") => {
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn }
    );
    
    const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    
    return { accessToken, refreshToken };
};

// Register User
const register = async (req, res) => {
    try {
        const { username, lastname, email, password } = req.body;

        // ✅ Validation
        if (!username || !email || !password || !lastname) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // ✅ Validate email format
        const cleanEmail = sanitizeInput(email);
        if (!isValidEmail(cleanEmail)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        // ✅ Validate password strength
        if (!isStrongPassword(password)) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)" 
            });
        }

        // ✅ Validate username and lastname length
        if (username.length < 3 || username.length > 50) {
            return res.status(400).json({ 
                success: false, 
                message: "Username must be between 3 and 50 characters" 
            });
        }

        // ✅ Check if email already exists
        const existingUser = await usersInfo.findOne({ email: cleanEmail });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "Email is already registered" 
            });
        }

        // ✅ Hash password with stronger salt rounds
        const hashedPassword = await bcrypt.hash(password, 12);

        // ✅ Create user
        const user = await usersInfo.create({
            username: username.trim(),
            lastname: lastname.trim(),
            email: cleanEmail,
            password: hashedPassword,
        });

        // ✅ Log successful registration
        console.log(`[AUTH] User registered: ${user._id}`);

        res.status(201).json({ 
            success: true, 
            message: "User created successfully. Please log in.", 
            user: { 
                id: user._id, 
                email: user.email,
                username: user.username
            } 
        });
    } catch (error) {
        console.error("[AUTH ERROR] Register error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Registration failed. Please try again later." 
        });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        // ✅ Sanitize email
        const cleanEmail = sanitizeInput(email);
        if (!isValidEmail(cleanEmail)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        // ✅ Find user
        const user = await usersInfo.findOne({ email: cleanEmail });
        if (!user) {
            // ✅ Generic error message to prevent user enumeration
            console.warn(`[AUTH] Login attempt with non-existent email: ${cleanEmail}`);
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }

        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // ✅ Generic error message
            console.warn(`[AUTH] Failed login attempt for user: ${user._id}`);
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }

        // ✅ Generate tokens
        const { accessToken, refreshToken } = generateTokens(
            { id: user._id, email: user.email, role: user.role },
            "1h"
        );

        // ✅ Set cookies with secure options
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", accessToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        console.log(`[AUTH] User logged in: ${user._id}`);

        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            token: accessToken,
            user: { 
                id: user._id, 
                email: user.email,
                username: user.username,
                role: user.role
            } 
        });
    } catch (error) {
        console.error("[AUTH ERROR] Login error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Login failed. Please try again later." 
        });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        // ✅ Sanitize and validate email
        const cleanEmail = sanitizeInput(email);
        if (!isValidEmail(cleanEmail)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        // ✅ Get admin credentials from environment (should be hashed in production)
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@college.com";
        const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
            "$2b$12$9vN5bZ2xF.5cE7d3mK2P.OhF5e0bK1n2x4j9p0L1q2s3t4u5V6w7"; // Pre-hashed password

        // ✅ Generic error message to prevent enumeration
        if (cleanEmail !== ADMIN_EMAIL) {
            console.warn(`[AUTH] Failed admin login attempt with email: ${cleanEmail}`);
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // ✅ Compare password (should be hashed)
        // For now, if ADMIN_PASSWORD_HASH is set, use bcrypt comparison
        // Otherwise, use environment variable directly
        let passwordValid = false;
        
        if (ADMIN_PASSWORD_HASH && ADMIN_PASSWORD_HASH.startsWith('$2b$')) {
            // Hashed password - use bcrypt
            passwordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        } else {
            // Direct comparison (less secure - should be improved)
            const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
            passwordValid = password === ADMIN_PASSWORD;
            console.warn("[AUTH] Admin using plain text password - upgrade to hashed password");
        }

        if (!passwordValid) {
            console.warn(`[AUTH] Failed admin password attempt`);
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // ✅ Generate secure admin tokens
        const { accessToken, refreshToken } = generateTokens(
            { email: cleanEmail, isAdmin: true },
            "2h" // Admin tokens valid for 2 hours
        );

        // ✅ Set secure cookies
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("adminToken", accessToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        res.cookie("adminRefreshToken", refreshToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        console.log(`[AUTH] Admin logged in: ${cleanEmail}`);

        // ✅ Don't send token in response body - it's in httpOnly cookie
        res.status(200).json({ 
            success: true, 
            message: "Admin login successful",
            admin: { email: cleanEmail }
        });
    } catch (error) {
        console.error("[AUTH ERROR] Admin login error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Admin login failed. Please try again later." 
        });
    }
};

// Officer Login
const officerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // ✅ Sanitize and validate email
        const cleanEmail = sanitizeInput(email);
        if (!isValidEmail(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // ✅ Find officer
        const officer = await AllOfficers.findOne({ email: cleanEmail });
        if (!officer) {
            console.warn(`[AUTH] Officer login attempt with non-existent email: ${cleanEmail}`);
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, officer.password);
        if (!isMatch) {
            console.warn(`[AUTH] Failed officer login attempt for: ${officer._id}`);
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // ✅ Generate tokens
        const { accessToken, refreshToken } = generateTokens(
            { 
                id: officer._id, 
                email: officer.email,
                category: officer.category,
                isOfficer: true 
            },
            "2h" // Officer token valid for 2 hours
        );

        // ✅ Set secure cookies
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("officerToken", accessToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        res.cookie("officerRefreshToken", refreshToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        console.log(`[AUTH] Officer logged in: ${officer._id}`);

        res.status(200).json({
            success: true,
            message: "Officer login successful",
            officer: {
                id: officer._id,
                email: officer.email,
                username: officer.username,
                lastname: officer.lastname,
                category: officer.category,
            }
        });

    } catch (error) {
        console.error("[AUTH ERROR] Officer login error:", error.message);
        res.status(500).json({
            success: false,
            message: "Officer login failed. Please try again later."
        });
    }
};
 

// Logout
const logout = async (req, res) => {
    try {
        // ✅ Clear all authentication cookies
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        res.clearCookie("adminToken");
        res.clearCookie("adminRefreshToken");
        res.clearCookie("officerToken");
        res.clearCookie("officerRefreshToken");

        console.log(`[AUTH] User logged out`);

        res.status(200).json({ 
            success: true, 
            message: "Logged out successfully" 
        });
    } catch (error) {
        console.error("[AUTH ERROR] Logout error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Logout failed. Please try again later." 
        });
    }
};

// ✅ NEW: Refresh Token Endpoint
const refreshAccessToken = async (req, res) => {
    try {
        let refreshToken;

        if (req.cookies && req.cookies.refreshToken) {
            refreshToken = req.cookies.refreshToken;
        } else if (req.cookies && req.cookies.adminRefreshToken) {
            refreshToken = req.cookies.adminRefreshToken;
        } else if (req.cookies && req.cookies.officerRefreshToken) {
            refreshToken = req.cookies.officerRefreshToken;
        }

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token found"
            });
        }

        // ✅ Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

        // ✅ Generate new access token
        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email, isAdmin: decoded.isAdmin, isOfficer: decoded.isOfficer },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // ✅ Set new token in cookie
        const isProduction = process.env.NODE_ENV === "production";
        
        if (decoded.isAdmin) {
            res.cookie("adminToken", newAccessToken, {
                httpOnly: true,
                sameSite: isProduction ? "none" : "lax",
                secure: isProduction ? true : false,
                maxAge: 60 * 60 * 1000
            });
        } else if (decoded.isOfficer) {
            res.cookie("officerToken", newAccessToken, {
                httpOnly: true,
                sameSite: isProduction ? "none" : "lax",
                secure: isProduction ? true : false,
                maxAge: 2 * 60 * 60 * 1000
            });
        } else {
            res.cookie("token", newAccessToken, {
                httpOnly: true,
                sameSite: isProduction ? "none" : "lax",
                secure: isProduction ? true : false,
                maxAge: 60 * 60 * 1000
            });
        }

        console.log(`[AUTH] Access token refreshed for user: ${decoded.email}`);

        res.status(200).json({
            success: true,
            message: "Access token refreshed",
            token: newAccessToken
        });
    } catch (error) {
        console.error("[AUTH ERROR] Token refresh error:", error.message);
        res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
};

module.exports = { register, login, adminLogin, logout, officerLogin, refreshAccessToken };