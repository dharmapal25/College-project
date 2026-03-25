const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema(
 {

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

  role: {
   type: String,
   enum: ["user", "admin"],
   default: "user",
  },

 },
 {
  timestamps: true,
 },

)


const AllOfficers = mongoose.model("allOfficers",officerSchema);

module.exports = AllOfficers