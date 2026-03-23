const express = require("express");
const cookieParser = require("cookie-parser");
const authRouters = require("./Routers/auth.router");
const enquiryRouter = require("./Routers/Enquiry.router");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// app.use("/auth", require("./Routers/auth.router")); // Direct pass
app.use("/auth", authRouters);
app.use("/enquiry",enquiryRouter);



module.exports = app