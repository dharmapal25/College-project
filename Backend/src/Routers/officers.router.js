const express = require("express");
const officersRouter = express.Router();
const { getOfficers } = require("../Controllers/officers.controller");

officersRouter.get("/officers", getOfficers);

module.exports = officersRouter;