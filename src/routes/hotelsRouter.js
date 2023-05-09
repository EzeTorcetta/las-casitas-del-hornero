const {Router} = require ("express");
const hotelsRouter = Router();
const {getAllHotelsHandler, getDetailHotelHandler, postHotelHandler} = require ("../handlers/hotelHandler")

hotelsRouter.get("/", getAllHotelsHandler)
hotelsRouter.get("/:id", getDetailHotelHandler)
hotelsRouter.post("/", postHotelHandler)

module.exports = hotelsRouter