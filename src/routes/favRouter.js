const { Router } = require("express");
const favRouter = Router();

const {
  getFavHandler,
  postFavHandler,
  deleteFavHandler,
  deleteAllFavsHandler
} = require("../handlers/favHandler");

favRouter.get("/:id_user", getFavHandler);
favRouter.delete("/:id_user", deleteAllFavsHandler);
favRouter.delete("/:id_user/:id_hotel", deleteFavHandler);
favRouter.post("/:id_user/:id_hotel", postFavHandler);

module.exports = favRouter;
