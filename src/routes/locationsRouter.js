const { Router } = require("express");
const locationsRouter = Router();
const {
  getAllProvincesHandler,
  getMunicipalitiesByIdHandler,
  getLocalitiesByIdHandler,
} = require("../handlers/locationsArgHandler");

locationsRouter.get("/", getAllProvincesHandler);
locationsRouter.get("/:id", getMunicipalitiesByIdHandler);
locationsRouter.get("/:id", getLocalitiesByIdHandler);

//!------DUDA--------
//!Me quedan dudas con respecto a las rutas de estos handlers

module.exports = hotelsRouter;
