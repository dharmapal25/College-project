const express = require("express");
const usersInfo = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AllOfficers = require("../models/allOfficers.model");

// Register User
const register = async (req, res) => {
    try {
        const { username, lastname, email, password } = req.body;

        // Validation - Check empty fields
        if (!username || !email || !password || !lastname) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required: username, lastname, email, password" 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 6 characters long" 
            });
        }

        // Validate names length
        if (username.length < 3 || lastname.length < 3) {
            return res.status(400).json({ 
                success: false, 
                message: "Username and lastname must be at least 3 characters long" 
            });
        }

        // Check if email already exists in database
        const existingUser = await usersInfo.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                message: "Email is already registered. Please login or use a different email." 
            });
        }

        // Hash password with salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in MongoDB
        const user = await usersInfo.create({
            username: username.trim(),
            lastname: lastname.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        // Return success response
        res.status(201).json({ 
            success: true, 
            message: "User registered successfully. Please login.", 
            user: { 
                id: user._id, 
                email: user.email,
                username: user.username,
                lastname: user.lastname
            } 
        });
    } catch (error) {
        console.error("Register error:", error.message);
        
        // Handle MongoDB validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false, 
                message: messages.join(", ") 
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({ 
                success: false, 
                message: `${field} is already in use` 
            });
        }

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

        // Validation - Check empty fields
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        // Find user in MongoDB by email (case-insensitive)
        const user = await usersInfo.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password. Please check and try again." 
            });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password. Please check and try again." 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || "default_secret_key",
            { expiresIn: "7d" }
        );

        // Set secure cookie
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            token, 
            user: { 
                id: user._id, 
                email: user.email,
                username: user.username,
                lastname: user.lastname,
                role: user.role
            } 
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Login failed. Please try again later." 
        });
    }
};

// Admin Login - Direct Login with Admin Credentials
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        // Admin credentials from environment variables
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@college.com";
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

        // Check email
        if (email !== ADMIN_EMAIL) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // Check password
        if (password !== ADMIN_PASSWORD) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // Generate admin token
        const adminToken = jwt.sign(
            { 
                email: email,
                isAdmin: true,
                role: "admin"
            },
            process.env.JWT_SECRET || "default_secret_key",
            { expiresIn: "7d" }
        );

        // Set secure cookie
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({ 
            success: true, 
            message: "Admin login successful", 
            adminToken,
            admin: {
                email: ADMIN_EMAIL,
                role: "admin"
            }
        });
    } catch (error) {
        console.error("Admin login error:", error.message);
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

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Find officer in MongoDB
        const officer = await AllOfficers.findOne({ email: email.toLowerCase() });
        if (!officer) {
            return res.status(401).json({
                success: false,
                message: "Officer not found. Invalid credentials."
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, officer.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate officer token
        const token = jwt.sign(
            { 
                id: officer._id, 
                email: officer.email,
                category: officer.category,
                isOfficer: true 
            },
            process.env.JWT_SECRET || "default_secret_key",
            { expiresIn: "7d" }
        );

        // Set secure cookie
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("officerToken", token, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            message: "Officer login successful",
            token,
            officer: {
                id: officer._id,
                email: officer.email,
                username: officer.username,
                lastname: officer.lastname,
                category: officer.category,
            }
        });

    } catch (error) {
        console.error("Officer login error:", error.message);
        res.status(500).json({
            success: false,
            message: "Officer login failed. Please try again later."
        });
    }
};
 

// Logout
const logout = async (req, res) => {
    try {
        // Clear all authentication cookies
        res.clearCookie("token");
        res.clearCookie("adminToken");
        res.clearCookie("officerToken");
        
        res.status(200).json({ 
            success: true, 
            message: "Logged out successfully" 
        });
    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Logout failed. Please try again." 
        });
    }
};

module.exports = { register, login, adminLogin, logout, officerLogin };