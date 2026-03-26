const express = require("express");
const officersRouter = express.Router();
const { getOfficers, addOfficer } = require("../Controllers/officers.controller");
const { adminMiddleware } = require("../middlewares/router.middleware");

officersRouter.get("/", getOfficers);
officersRouter.post("/add-officer", adminMiddleware, addOfficer);

module.exports = officersRouter;