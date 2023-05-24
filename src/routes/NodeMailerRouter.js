const { Router } = require("express");
const NodeMailerRouter = Router();

const {
  getNodeMailerHandler,
  getRegistroNodeMailerHandler,
  getNodeMailerReservaHandler,
} = require("../handlers/getNodeMailerHandler");

NodeMailerRouter.get("/", getNodeMailerHandler);
NodeMailerRouter.get("/Reserva/:gmail", getNodeMailerReservaHandler);
NodeMailerRouter.get("/Registro/:gmail", getRegistroNodeMailerHandler);

module.exports = NodeMailerRouter;
