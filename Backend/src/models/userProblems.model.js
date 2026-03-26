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
            values: ["infrastructure", "academic", "hostel", "other"],
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
        maxlength: [2000, "Description must be at most 2000 characters"],
    },

    Emergency: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        enum: ["pending", "progress", "closed", "completed"],
        default: "pending"
    }

}, { timestamps: true });

// Add indexes for faster queries
userProblemSchema.index({ email: 1 });
userProblemSchema.index({ email: 1, createdAt: -1 });
userProblemSchema.index({ status: 1 });
userProblemSchema.index({ category: 1 });
userProblemSchema.index({ createdAt: -1 });

const userProblems = mongoose.model("userProblems", userProblemSchema);
module.exports = userProblems;