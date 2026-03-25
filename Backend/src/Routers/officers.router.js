const express = require("express");
const officersRouter = express.Router();
const { getOfficers, addOfficer } = require("../Controllers/officers.controller");
const { adminMiddleware } = require("../middlewares/router.middleware");

officersRouter.get("/officers", getOfficers);
officersRouter.post("/add-officer", adminMiddleware, addOfficer);

module.exports = officersRouter;