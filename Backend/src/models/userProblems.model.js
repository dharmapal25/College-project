const mongoose = require("mongoose");

const userProblemSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: [true, "Email is already taken"],
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        minlength: [6, "Email must be at least 6 characters"],
    },

    location: {
        type: String,
        required: [true, "Location is required"],
        minlength: [3, "Location must be at least 3 characters"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters"],
        maxlength: [2000, "Description must be at most 2000 characters"],               
    },

    date: {
        type: Date,
        default: Date.now
    },

    Emergency: {
        type: Boolean,
        default: false
    },
})

const userProblems = mongoose.model("userProblems", userProblemSchema);
module.exports = userProblems;