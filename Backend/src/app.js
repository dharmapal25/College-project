const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouters = require("./Routers/auth.router");
const enquiryRouter = require("./Routers/Enquiry.router");
const cors = require("cors");
const app = express();

// CORS configuration
app.use(cors({
    origin: function(origin, callback) {
        // Allow:
        // 1. Requests with no origin (curl, mobile apps, same-origin)
        // 2. All localhost variations
        // 3. All Vercel deployment URLs
        // 4. Development environments
        const allowRequest = !origin || 
                           origin.includes("localhost") || 
                           origin.includes("127.0.0.1") ||
                           origin.includes("vercel.app") ||
                           origin === "http://localhost:5173" ||
                           origin === "http://localhost:3000";
        
        if (allowRequest) {
            callback(null, true);
        } else {
            console.log(`CORS request from: ${origin}`);
            callback(null, true); // Allow all for now to debug
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
    exposedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400
}));

app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get("/", (req, res) => {
    res.status(200).json({ 
        message: "College Pro API is running", 
        timestamp: new Date().toISOString(),
        status: "online"
    });
});

// API Routes
app.use("/api/auth", authRouters);
app.use("/api/user-enquiry", enquiryRouter);
app.use("/api/officers-team", require("./Routers/officers.router"));
app.use("/api/logs", require("./Routers/logs.router"));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = app