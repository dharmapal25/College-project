const jwt = require("jsonwebtoken");
const usersInfo = require("../models/users.model");

// ✅ General Auth Middleware
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // ✅ Try to get token from cookies first (httpOnly)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } 
    // ✅ Fallback: Authorization header (for API clients)
    else if (req.headers.authorization) {
      const headerParts = req.headers.authorization.split(" ");
      if (headerParts.length === 2 && headerParts[0] === "Bearer") {
        token = headerParts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        redirect: "/login",
        message: "Unauthorized: No token found",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Check if token is about to expire (less than 5 minutes)
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 300) {
      console.warn(`[AUTH] Token expiring soon for user: ${decoded.id}`);
    }

    // ✅ Find user and ensure they still exist
    const user = await usersInfo.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        redirect: "/login"
      });
    }

    req.user = user;
    req.token = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.warn("[AUTH] Token expired");
      return res.status(401).json({
        success: false,
        redirect: "/login",
        message: "Token expired. Please login again.",
      });
    }
    
    console.error("[AUTH ERROR]", error.message);
    return res.status(401).json({
      success: false,
      redirect: "/login",
      message: "Unauthorized: Invalid token",
    });
  }
};

// ✅ Admin/Officer Auth Middleware
const adminMiddleware = async (req, res, next) => {
  try {
    let token;

    // ✅ Try admin token first
    if (req.cookies && req.cookies.adminToken) {
      token = req.cookies.adminToken;
    } 
    // ✅ Fallback: Authorization header
    else if (req.headers.authorization) {
      const headerParts = req.headers.authorization.split(" ");
      if (headerParts.length === 2 && headerParts[0] === "Bearer") {
        token = headerParts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        redirect: "/officers-login",
        message: "Unauthorized: Admin token not found",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Check admin status
    if (!decoded.isAdmin) {
      console.warn(`[AUTH] Non-admin user attempted admin access`);
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    // ✅ Check if token is about to expire
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 300) {
      console.warn(`[AUTH] Admin token expiring soon`);
    }

    req.admin = decoded;
    req.token = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.warn("[AUTH] Admin token expired");
      return res.status(401).json({
        success: false,
        redirect: "/officers-login",
        message: "Admin token expired. Please login again.",
      });
    }

    console.error("[AUTH ERROR] Admin middleware:", error.message);
    return res.status(401).json({
      success: false,
      redirect: "/officers-login",
      message: "Unauthorized: Invalid admin token",
    });
  }
};

// ✅ Officer Auth Middleware
const officerMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.officerToken) {
      token = req.cookies.officerToken;
    } else if (req.headers.authorization) {
      const headerParts = req.headers.authorization.split(" ");
      if (headerParts.length === 2 && headerParts[0] === "Bearer") {
        token = headerParts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Officer token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.isOfficer) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Officer access required",
      });
    }

    req.officer = decoded;
    req.token = decoded;
    next();
  } catch (error) {
    console.error("[AUTH ERROR] Officer middleware:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid officer token",
    });
  }
};

module.exports = { authMiddleware, adminMiddleware, officerMiddleware };