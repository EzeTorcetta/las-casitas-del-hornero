const { Router } = require("express");
const hotelsRouter = Router();
const {
  getAllHotelsHandler,
  getDetailHotelHandler,
  postHotelHandler,
  putStatusHotelHandler,
  updateHotelHandler,
  getFilterSuperAdminHotelsHandler,
  getAllHotelsAdminHandler
} = require("../handlers/hotelHandler");

hotelsRouter.get("/allHotels/:id_superAdmin", getAllHotelsAdminHandler);
hotelsRouter.get("/", getAllHotelsHandler);
hotelsRouter.get("/:id_hotel", getDetailHotelHandler);
hotelsRouter.get("/stats/:id_superAdmin/:filter", getFilterSuperAdminHotelsHandler); //filter puede ser "rated"(filtrados por valoration) o "booking" (filtrados por más reservados)
hotelsRouter.put("/status/:id_hotel", putStatusHotelHandler)
hotelsRouter.put("/update/:id_hotel", updateHotelHandler)
hotelsRouter.post("/:id_user", postHotelHandler);

module.exports = hotelsRouter;
