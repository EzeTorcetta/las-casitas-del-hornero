const { Router } = require("express");
const bookingRouter = Router();

const {
  getBookingUserHandler,
  getBookingHotelHandler,
  getAllBookingsHandler,
  postBookingHandler,
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

bookingRouter.get("/", checkUserProperties);

bookingRouter.put("/:id_user", postBookingHandler);

module.exports = bookingRouter;
