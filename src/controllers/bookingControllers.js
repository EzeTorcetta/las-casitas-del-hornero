const { Booking, User, RoomType, Hotel } = require("../db");

//*-------- GET ALL BOOKINGS-----------------

const getAllBookings = async (id_user) => {
  const findUser = await User.findByPk(id_user);

  if (!findUser.rol == 3) {
    throw new Error("Permission denied, you are not an administrator");
  } else {
    const findAllBooking = await Booking.findAll();
    const bookings = await Promise.all(
      findAllBooking.map(async (booking) => {
        const user = await User.findByPk(booking.UserId);
        const hotel = await Hotel.findByPk(booking.HotelId);

        return {
          userEmail: user.email,
          amount: booking.amount,
          individualPrice: booking.price,
          totalPrice: booking.amount * booking.price,
          date: booking.date,
          hotelName: hotel.name,
        };
      })
    );

    return bookings;
  }
};

//*-------- GET ALL BOOKINGS OF HOTEL--------------
const getBookingHotel = async (id_user, id_hotel) => {
  const findHotel = await Hotel.findOne({
    where: {
      id: id_hotel,
      UserId: id_user,
    },
  });

  if (!findHotel) {
    throw new Error("Permission denied or Hotel does not exist");
  }

  const bookingsHotel = await Booking.findAll({
    where: {
      HotelId: id_hotel,
    },
  });

  return bookingsHotel;
};

//*-------- GET ALL BOOKINGS OF USER--------------
const getBookingUser = async (id_user) => {
  const bookingUser = await Booking.findAll({
    where: {
      UserId: id_user,
    },
  });

  return bookingUser;
};

//*-------- POST BOOKING ---------------------
const postBooking = async (body, id_user) => {
  const roomTypeIds = body.map((item) => item.id);
  const roomTypes = await RoomType.findAll({ where: { id: roomTypeIds } });

  const updates = [];
  const bookings = [];

  for (let i = 0; i < body.length; i++) {
    const roomType = roomTypes.find((rt) => rt.id === body[i].id);

    if (body[i].amount == 0) throw new Error("Quantity cannot be 0");

    const newStock = roomType.stock - body[i].amount;

    if (newStock < 0) {
      throw new Error("Out of stock");
    }

    roomType.stock = newStock;

    updates.push(roomType); //* SI SE HACIA SAVE() ACA, SI EL SIGUIENTE NO TENIA STOCK, ARROJABA ERROR PERO LOS ANTERIORES SE LES RESTABA EL STOCK

    const bookingData = {
      amount: body[i].amount,
      price: roomType.price,
    };
    bookings.push(bookingData);
  }

  await Promise.all(updates);

  //* SAQUE EL SAVE AFUERA DEL BUCLE, ASI SE GUARDAN SOLO SI NO HUBO NINGUN ERROR
  await updates.map((roomtype) => roomtype.save());

  const createdBookings = await Booking.bulkCreate(bookings);

  const user = await User.findByPk(id_user);
  await user.addBooking(createdBookings);

  for (let i = 0; i < body.length; i++) {
    const roomType = roomTypes.find((rt) => rt.id === body[i].id);

    await roomType.addBooking(createdBookings[i]);

    const hotel = await Hotel.findByPk(roomType.HotelId);
    await hotel.addBooking(createdBookings[i]);
  }

  await Cart.destroy({
    where: {
      UserId: id_user,
      RoomTypeId: body[i].id,
    },
  });

  return "Reservation made successfully";
};

module.exports = {
  getAllBookings,
  getBookingUser,
  getBookingHotel,
  postBooking,
};
