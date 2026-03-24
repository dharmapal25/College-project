const express = require("express");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouters = require("./Routers/auth.router");
const enquiryRouter = require("./Routers/Enquiry.router");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
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

// Routes
app.use("/auth", authRouters);
app.use("/enquiry", enquiryRouter);

// 404 handler
app.use("*", (req, res) => {
    // res.status(404).json({ message: "Route not found" });
    res.sendFile(__dirname, "./public/index.html");
});

module.exports = app