const mongoose = require("mongoose");

const userProblemSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        minlength: [6, "Email must be at least 6 characters"],
    },

    category: {
        type: String,
        required: [true, "Category is required"],
        enum: {
            values: ["Infrastructure & Public Works", "Water & Sanitation", "Elecitricity & Power Supply", "Health & Public Safety", "Transportation & Traffic", "Education & Social Welfare", "Environment & Pollution", "Other"],
            message: "Invalid category: {VALUE}"
        }
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
        maxlength: [5000, "Description must be at most 5000 characters"],
    },

    Emergency: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        enum: ["pending", "in-progress", "resolved", "closed"],
        default: "pending"
    }

}, { timestamps: true });

const userProblems = mongoose.model("userProblems", userProblemSchema);
module.exports = userProblems;