const { Router } = require("express");
const NodeMailerRouter = Router();

const {
  getNodeMailerHandler,
  getRegistroNodeMailerHandler,
  getNodeMailerReservaHandler,
  getNodeMailerBaneoHandler,
} = require("../handlers/getNodeMailerHandler");

NodeMailerRouter.get("/", getNodeMailerHandler);
NodeMailerRouter.get("/Registro/:gmail", getRegistroNodeMailerHandler);
NodeMailerRouter.get("/Reserva/:gmail", getNodeMailerReservaHandler);
NodeMailerRouter.get("/Baneo/:gmail", getNodeMailerBaneoHandler);

module.exports = NodeMailerRouter;
