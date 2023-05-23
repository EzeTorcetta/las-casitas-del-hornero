const { Router } = require("express");
const hotelsRouter = Router();
const {
  getAllHotelsHandler,
  getDetailHotelHandler,
  postHotelHandler,
} = require("../handlers/hotelHandler");

hotelsRouter.get("/", getAllHotelsHandler);
hotelsRouter.get("/:id_hotel", getDetailHotelHandler);

hotelsRouter.post("/:id_user", postHotelHandler);

module.exports = hotelsRouter;
