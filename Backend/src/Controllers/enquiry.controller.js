// const express = require("express");
const userProblems = require("../models/userProblems.model");
const usersInfo = require("../models/users.model");

const enquiry = async (req, res) => {

    const { email, location, description, Emergency } = req.body; // email, location, description

    try {

        if (!email || !location || !description) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }



        usersInfo.findOne({ email }).then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }
        });

        let dataEmail = await userProblems.findOne({ email });

        if (dataEmail) {
            return res.status(400).json({
                message: "Email is already taken"
            });
        }

        const user = await userProblems.create({
            email, location, description, Emergency
        });
        res.status(201).json({
            message: "Enquiry submitted successfully",
            user
        });
        
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }



};

module.exports = { enquiry };