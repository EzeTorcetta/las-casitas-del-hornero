const {Router} = require ("express");
const favRouter = Router();

const {getFavsHandler, postFavHandler, deleteFavHandler} = require ("../handlers/hotelHandler")

favRouter.get("/:id_user", getFavsHandler)
favRouter.delete("/:id_hotel", deleteFavHandler)
favRouter.post("/:id_user/:id_hotel", postFavHandler)

module.exports = favRouter