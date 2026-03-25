// allOfficers.model.js
const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        trim: true,
    },

    lastname: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already taken"],
        lowercase: true,
        trim: true,
        minlength: [6, "Email must be at least 6 characters"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },

    Phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: [true, "Phone number is already taken"],
        trim: true,
        minlength: [10, "Phone number must be at least 10 digits"],
    },

    category: {
        type: String,
        required: [true, "Category is required"],
        enum: {
            values: ["infrastructure", "academic", "hostel", "other"],
            message: "Invalid category: {VALUE}"
        }
    },
},
    {
        timestamps: true,
    },

)


const AllOfficers = mongoose.model("allOfficers", officerSchema);

module.exports = AllOfficers