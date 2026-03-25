const userProblems = require("../models/userProblems.model");
const usersInfo = require("../models/users.model");

const enquiry = async (req, res) => {

    const { email, location, description, category, Emergency } = req.body;

    try {

        if (!email || !location || !description || !category) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await usersInfo.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found. Please register first."
            });
        }

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const todayCount = await userProblems.countDocuments({
            email,
            createdAt: { $gte: todayStart, $lte: todayEnd }
        });

        if (todayCount >= 3) {
            return res.status(429).json({
                message: "Daily limit reached. You can only submit 3 enquiries per day."
            });
        }

        await userProblems.dropIndexes("email");

        const newEnquiry = await userProblems.create({
            email,
            location,
            category,
            description,
            Emergency: Emergency || false,
            status: "pending"
        });

        res.status(201).json({
            message: `Enquiry submitted successfully. (${todayCount + 1}/3 today)`,
            enquiry: newEnquiry
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { enquiry };