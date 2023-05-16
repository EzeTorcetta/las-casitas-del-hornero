const { Router } = require("express");
const cartRouter = Router();

const {
  getCartHandler,
  postCartHandler,
  deleteCartHandler,
} = require("../handlers/cartHandler");

cartRouter.get("/:id_user", getCartHandler);
cartRouter.delete("/:id_user/:id_roomtype", deleteCartHandler);
cartRouter.post("/:id_user/:id_roomtype", postCartHandler);

module.exports = cartRouter;
