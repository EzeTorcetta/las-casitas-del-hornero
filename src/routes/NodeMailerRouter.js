const { Router } = require("express");
const NodeMailerRouter = Router();

const {
  getNodeMailerHandler,
  getRegistroNodeMailerHandler,
  getNodeMailerReservaHandler,
  getNodeMailerBaneoHandler,
  getNodeMailerCreacionDeHotelHandler,
} = require("../handlers/getNodeMailerHandler");

NodeMailerRouter.get("/", getNodeMailerHandler);
NodeMailerRouter.get("/Registro/:gmail", getRegistroNodeMailerHandler);
NodeMailerRouter.get("/Reserva/:gmail", getNodeMailerReservaHandler);
NodeMailerRouter.get("/Baneo/:gmail", getNodeMailerBaneoHandler);
NodeMailerRouter.get(
  "/CreacionDeHotel/:gmail",
  getNodeMailerCreacionDeHotelHandler
);

module.exports = NodeMailerRouter;
