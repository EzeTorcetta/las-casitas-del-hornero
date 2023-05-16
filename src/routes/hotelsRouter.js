const { Router } = require("express");
const { validateCreate } = require("../validators/hotels");
const hotelsRouter = Router();
const {
  getAllHotelsHandler,
  getDetailHotelHandler,
  postHotelHandler,
} = require("../handlers/hotelHandler");

hotelsRouter.get("/", getAllHotelsHandler);
hotelsRouter.get("/:id", getDetailHotelHandler);
hotelsRouter.post("/", validateCreate, postHotelHandler);

module.exports = hotelsRouter;
