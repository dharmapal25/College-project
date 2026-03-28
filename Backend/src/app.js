const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouters = require("./Routers/auth.router");
const enquiryRouter = require("./Routers/Enquiry.router");
const cors = require("cors");
const app = express();

// CORS configuration
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://college-pro-client.vercel.app",
    "https://college-pro-client.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000"
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin) || origin.includes("vercel.app")) {
            callback(null, true);
        } else {
            console.log(`CORS blocked for origin: ${origin}`);
            callback(new Error("CORS not allowed"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
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