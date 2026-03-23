const express = require("express");
const authRouters = express.Router();

const {register,login} = require("../Controllers/auth.controller");
const authMiddleware = require("../middlewares/router.middleware");

authRouters.get("/",(req,res)=> {
    res.send("Hello bro");
})

authRouters.post("/register", register);
authRouters.post("/login", login);

module.exports = authRouters;