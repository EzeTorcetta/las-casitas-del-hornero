const { Router } = require("express");
const bookingRouter = Router();

const {
  getBookingUserHandler,
  getBookingHotelHandler,
  getAllBookingsHandler,
  postBookingHandler,
  getProvinceBookingsHandler,
  getMonthBookingsHandler,
  getMostBookingPartnerHandler,
  getUserBookingsHandler,
  getMonthBookingPartnerHandler
} = require("../handlers/bookingHandler");

const checkUserProperties = (req, res) => {
  const { rol } = req.query;

  if (rol == 1) {
    return getBookingUserHandler(req, res);
  }

  if (rol == 2) {
    return getBookingHotelHandler(req, res);
  }

  if (rol == 3) {
    return getAllBookingsHandler(req, res);
  }

  return res.status(400).json({ error: "No es por aca lince" });
};

bookingRouter.put("/:id_user", postBookingHandler);
bookingRouter.get("/", checkUserProperties);
bookingRouter.get("/province/:id_superadmin", getProvinceBookingsHandler);
bookingRouter.get("/month/:id_superadmin", getMonthBookingsHandler);
bookingRouter.get("/mostBooking/:id_admin", getMostBookingPartnerHandler);
bookingRouter.get("/monthPartner/:id_admin", getMonthBookingPartnerHandler);
bookingRouter.get("/mostBookingUser/:id_superadmin", getUserBookingsHandler);


module.exports = bookingRouter;
