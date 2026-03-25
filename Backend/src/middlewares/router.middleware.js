const jwt = require("jsonwebtoken");
const usersInfo = require("../models/users.model");

// General Auth Middleware
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        redirect: "/login",
        message: "Unauthorized: No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersInfo.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        redirect: "/login"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
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

    if (req.cookies && req.cookies.adminToken) {
      token = req.cookies.adminToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        redirect: "/officers-login",
        message: "Unauthorized: Admin token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      redirect: "/officers-login",
      message: "Unauthorized: Invalid admin token",
    });
  }
};

module.exports = { authMiddleware, adminMiddleware };