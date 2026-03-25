const express = require("express");
const usersInfo = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AllOfficers = require("../models/allOfficers.model");

// Register User
const register = async (req, res) => {
    try {
        const { username, lastname, email, password } = req.body;

        // Validation
        if (!username || !email || !password || !lastname) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Check if email already exists
        const existingUser = await usersInfo.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "Email is already taken" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await usersInfo.create({
            username,
            lastname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ 
            success: true, 
            message: "User created successfully", 
            user: { 
                id: user._id, 
                email: user.email,
                username: user.username
            } 
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        // Find user
        const user = await usersInfo.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set cookie
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            token, 
            user: { 
                id: user._id, 
                email: user.email,
                username: user.username
            } 
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

// Admin Login
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

        // Admin credentials (from environment variables)
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@college.com";
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

        // Check email
        if (email !== ADMIN_EMAIL) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // Check password (simplified direct comparison)
        if (password !== ADMIN_PASSWORD) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        // Generate admin token
        const adminToken = jwt.sign(
            { email, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set cookie
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ 
            success: true, 
            message: "Admin login successful", 
            adminToken 
        });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

// /Officer Login
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

        // Officer find karo
        const officer = await AllOfficers.findOne({ email });
        if (!officer) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Password compare karo
        const isMatch = await bcrypt.compare(password, officer.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Token banao
        const token = jwt.sign(
            { 
                id: officer._id, 
                email: officer.email,
                category: officer.category,
                isOfficer: true 
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Cookie set karo
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("officerToken", token, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false,
            maxAge: 24 * 60 * 60 * 1000
        });

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
        console.error("Officer login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
 

// Logout
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.clearCookie("adminToken");
        res.status(200).json({ 
            success: true, 
            message: "Logged out successfully" 
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

module.exports = { register, login, adminLogin, logout, officerLogin };