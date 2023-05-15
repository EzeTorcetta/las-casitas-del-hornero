const { Router } = require("express");
const locationsRouter = Router();
const {
  getAllProvincesHandler,
  getLocationsHandler,
  // getMunicipalitiesByIdHandler,
  // getLocalitiesByIdHandler,
} = require("../handlers/locationsArgHandler");

locationsRouter.get("/", getLocationsHandler);
// locationsRouter.get("/", getMunicipalitiesByIdHandler);
// locationsRouter.get("/", getLocalitiesByIdHandler);

//!------DUDA--------
//!Me quedan dudas con respecto a las rutas de estos handlers

module.exports = hotelsRouter;
