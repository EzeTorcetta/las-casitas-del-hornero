const { Router } = require("express");
const cartRouter = Router();

const {
  getCartHandler,
  postCartHandler,
  deleteCartHandler,
  deleteAllCartHandler,
  putAmountCartHandler,
} = require("../handlers/cartHandler");

cartRouter.get("/:id_user", getCartHandler);
cartRouter.delete("/:id_user", deleteAllCartHandler);
cartRouter.delete("/:id_user/:id_roomtype", deleteCartHandler);
cartRouter.post("/:id_user/:id_roomtype", postCartHandler);
cartRouter.put("/:id_user/:id_roomtype/", putAmountCartHandler);
module.exports = cartRouter;
