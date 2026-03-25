const express = require("express");
const enquiryRouter = express.Router();

const { enquiry } = require("../Controllers/enquiry.controller");
const authMiddleware = require("../middlewares/router.middleware");

enquiryRouter.post("/enquiry", authMiddleware, enquiry);

module.exports = enquiryRouter;



