const { Router } = require("express");
const locationsRouter = Router();
const { getLocationsHandler } = require("../handlers/locationsArgHandler");

locationsRouter.get("/", getLocationsHandler);

module.exports = locationsRouter;
