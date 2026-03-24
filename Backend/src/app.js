const express = require("express");
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

console.log(process.env.PORT);
console.log(process.env.MONGO_URI);
console.log(process.env.FRONTEND_URL);

app.use(express.json());
app.use(cookieParser());
// app.use("/auth", require("./Routers/auth.router")); // Direct pass
app.use("/auth", authRouters);
app.use("/enquiry",enquiryRouter);



module.exports = app