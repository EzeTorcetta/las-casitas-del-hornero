const { 
  getAllBookings,
  getBookingUser,
  getBookingHotel,
  postBooking,
  getProvinceBookings,
  getMonthBookings,
  getMostBookingPartner,
  getUserBookings,
  getMonthBookingPartner
} = require("../controllers/bookingControllers");

//* handler para traer todos las reservaciones (para el gigachad mega admin)
const getAllBookingsHandler = async (req, res) => {
  const { id_superadmin } = req.query;

  try {
    const allBookings = await getAllBookings(id_superadmin);
    res.status(200).json(allBookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* handler para traer todos las reservaciones de un hotel que pertenece a un usuario admin(por id)
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

//* handler para traer las provincias mas visitadas (devuelve un array de obj con cada provincia y la cant de reservaciones)
const getProvinceBookingsHandler = async (req, res) => {
  const { id_superadmin } = req.params;
  try {
    const province = await getProvinceBookings(id_superadmin);
    res.status(200).json(province);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* handler para traer los meses que mas se reservo (devuelve un array de obj con cada mes y la cant de reservaciones)
const getMonthBookingsHandler = async (req, res) => {
  const { id_superadmin } = req.params;
  try {
    const month = await getMonthBookings(id_superadmin);
    res.status(200).json(month);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* handler para el usuario que mas se reservo (devuelve un array con los usuarios y la cantidad de reservaciones por c/u)
const getUserBookingsHandler = async (req, res) => {
  const { id_superadmin } = req.params;
  try {
    const usersAmount = await getUserBookings(id_superadmin);
    res.status(200).json(usersAmount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* handler para ver los hoteles mas reservados de un admin (devuelve array de obj con cada hotel del admin y la cant de reservaciones)
const getMostBookingPartnerHandler = async (req, res) => {
  const { id_admin } = req.params;
  try {
    const hotels = await getMostBookingPartner(id_admin);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* handler para ver los meses que mas se reservaron de los hoteles de un admin (devuelve un array de obj con cada mes y la cantidad de reservaciones)
const getMonthBookingPartnerHandler = async (req, res) => {
  const { id_admin } = req.params;
  try {
    const month = await getMonthBookingPartner(id_admin);
    res.status(200).json(month);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getAllBookingsHandler,
  postBookingHandler,
  getBookingHotelHandler,
  getBookingUserHandler,
  getProvinceBookingsHandler,
  getMonthBookingsHandler,
  getMostBookingPartnerHandler,
  getUserBookingsHandler,
  getMonthBookingPartnerHandler
};
