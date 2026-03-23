const jwt = require("jsonwebtoken");
const usersInfo = require("../models/users.model");

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
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
      });
    }

    req.user = user;

    next(); // ✅ access granted
  } catch (error) {
    console.error("Auth Error:", error.message);

    return res.status(401).json({
      redirect: "/login",
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;