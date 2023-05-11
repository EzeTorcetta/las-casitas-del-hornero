const { Router } = require("express");

const {
  getAllServicesHandler,
  postServicesHandler,
  deleteServicesHandler,
} = require("../handlers/servicesHandler");

const servicesRouter = Router();

servicesRouter.get("/", getAllServicesHandler);
servicesRouter.post("/", postServicesHandler);
servicesRouter.delete("/:id_service", deleteServicesHandler);

module.exports = servicesRouter;
