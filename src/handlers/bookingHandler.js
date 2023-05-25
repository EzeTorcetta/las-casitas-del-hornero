const {
  getAllBookings,
  getBookingUser,
  getBookingHotel,
  postBooking,
} = require("../controllers/bookingControllers");

//* handler para traer todos las reservaciones (para el gigachad mega admin)
const getAllBookingsHandler = async (req, res) => {
  const { id_superadmin } = req.query;

  try {
    const getAllBokings = await getAllBookings(id_superadmin);
    res.status(200).json(getAllBokings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* handler para traer todos las reservaciones de un hotel quuue pertenece a un usuario admin(por id)
const getBookingHotelHandler = async (req, res) => {
  const { id_user, id_hotel } = req.query;

  try {
    const bookingsHotel = await getBookingHotel(id_user, id_hotel);
    res.status(200).json(bookingsHotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* handler para traer las reservaciones como user normal
const getBookingUserHandler = async (req, res) => {
  const { id_user } = req.query;

  try {
    const bookingUser = await getBookingUser(id_user);
    res.status(200).json(bookingUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* handler para postear reservas nuevas
const postBookingHandler = async (req, res) => {
  const { id_user } = req.params;
  const { checkIn, checkOut } = req.query;
  const data = req.body;
  try {
    const booking = await postBooking(data, id_user, checkIn, checkOut );
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBookingsHandler,
  postBookingHandler,
  getBookingHotelHandler,
  getBookingUserHandler,
};
