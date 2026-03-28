const jwt = require("jsonwebtoken");
const usersInfo = require("../models/users.model");

// General Auth Middleware
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Try to get token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } 
    // Try to get token from Authorization header
    else if (req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer ", "");
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        redirect: "/login",
        message: "Unauthorized: Authentication token is required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    
    // Find user in database
    const user = await usersInfo.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        redirect: "/login"
      });
    }

    // Attach user to request
    req.user = user;
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        redirect: "/login",
        message: "Token has expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        redirect: "/login",
        message: "Invalid token. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      redirect: "/login",
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

// Admin/Officer Auth Middleware
const adminMiddleware = async (req, res, next) => {
  try {
    let token;

    // Try to get token from cookies
    if (req.cookies && req.cookies.adminToken) {
      token = req.cookies.adminToken;
    }
    // Try to get token from Authorization header
    // else if (req.headers.authorization) {
    //   token = req.headers.authorization.replace("Bearer ", "");
    // }

    if (!token) {
      return res.status(401).json({
        success: false,
        redirect: "/officers-login",
        message: "Unauthorized: Admin token is required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    
    // Check if token has admin privileges
    if (!decoded.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    // Attach admin info to request
    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        redirect: "/officers-login",
        message: "Admin token has expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        redirect: "/officers-login",
        message: "Invalid admin token. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      redirect: "/officers-login",
      message: "Unauthorized: Invalid admin token",
    });
  }
};

module.exports = { authMiddleware, adminMiddleware };