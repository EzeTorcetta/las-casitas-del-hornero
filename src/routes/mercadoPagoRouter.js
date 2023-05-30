const { Router } = require("express");
const mercadoPagoRouter = Router();
const { mercadoPagoHandler } = require("../handlers/mercadoPagoHandler");
mercadoPagoRouter.post("/", mercadoPagoHandler);

module.exports = mercadoPagoRouter
