const { Router } = require("express");
const NodeMailerRouter = Router();

const {
  getNodeMailerHandler,
  getRegistroNodeMailerHandler,
} = require("../handlers/getNodeMailerHandler");

NodeMailerRouter.get("/", getNodeMailerHandler);
NodeMailerRouter.get("/Registro/:gmail", getRegistroNodeMailerHandler);

module.exports = NodeMailerRouter;
