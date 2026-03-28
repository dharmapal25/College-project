const userProblems = require("../models/userProblems.model");
const usersInfo = require("../models/users.model");

const enquiry = async (req, res) => {
    const { email, location, description, category, Emergency } = req.body;

    try {
        
        if (!email || !location || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: email, location, description, category"
            });
        }

       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

       
        const existingUser = await usersInfo.findOne({ email: email.toLowerCase() });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first."
            });
        }

        
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const todayCount = await userProblems.countDocuments({
            email: email.toLowerCase(),
            createdAt: { $gte: todayStart, $lte: todayEnd }
        });

        if (todayCount >= 3) {
            return res.status(429).json({
                success: false,
                message: "Daily limit reached. You can only submit 3 enquiries per day."
            });
        }

        // Create new enquiry in MongoDB
        const newEnquiry = await userProblems.create({
            email: email.toLowerCase(),
            location: location.trim(),
            category: category.trim(),
            description: description.trim(),
            Emergency: Emergency || false,
            status: "pending"
        });

        res.status(201).json({
            success: true,
            message: `Enquiry submitted successfully. (${todayCount + 1}/3 today)`,
            enquiry: {
                id: newEnquiry._id,
                email: newEnquiry.email,
                category: newEnquiry.category,
                location: newEnquiry.location,
                status: newEnquiry.status,
                createdAt: newEnquiry.createdAt
            }
        });

    } catch (error) {
        console.error("Enquiry error:", error.message);
        
        // Handle MongoDB validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(", ")
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to submit enquiry. Please try again later."
        });
    }
};

module.exports = { enquiry };