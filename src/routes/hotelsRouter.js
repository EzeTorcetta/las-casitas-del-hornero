const { Router } = require("express");
const hotelsRouter = Router();
const {
  getAllHotelsHandler,
  getDetailHotelHandler,
  postHotelHandler,
  putStatusHotelHandler
} = require("../handlers/hotelHandler");

hotelsRouter.get("/", getAllHotelsHandler);
hotelsRouter.get("/:id_hotel", getDetailHotelHandler);
hotelsRouter.put("/status/:id_hotel",putStatusHotelHandler)
hotelsRouter.post("/:id_user", postHotelHandler);

module.exports = hotelsRouter;
