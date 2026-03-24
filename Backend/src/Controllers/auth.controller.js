const express = require("express");
const usersInfo = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const { username,lastname, email, password } = req.body;

    if (!username || !email || !password || !lastname) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const data = await usersInfo.findOne({ email });

    if (data) {
        return res.status(400).json({ message: "Email is already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await usersInfo.create({
        username,
        lastname,
        email,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", user });

};

const login = async (req, res) => {
    
    const {email, password} = req.body;

    const user = await usersInfo.findOne({email});

    if(!user){
        return res.status(400).json({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const token = jwt.sign({id: user._id,email: user.email},
         process.env.JWT_SECRET,
         {expiresIn: "1d"});

    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction ? true : false,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({message: "Login successful", token});
};

module.exports = {register,login};