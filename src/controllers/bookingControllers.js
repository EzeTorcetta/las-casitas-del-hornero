const {Booking, User, RoomType, Hotel} = require("../db")


//*-------- GET ALL BOOKINGS-----------------
const getAllBookings = async(id_user) => {
    console.log(id_user)
    const findUser = await User.findByPk(id_user)
    console.log(findUser)


     if (findUser.rol == 3){
        findAllBooking = await Booking.findAll()
        return findAllBooking
     } else {
         throw new Error("Permission denied, you are not an administrator");
     }

}

//*-------- GET ALL BOOKINGS OF HOTEL--------------
const getBookingHotel = async(id_hotel) => {       //* ID HOTEL
    
    const bookingsHotel = await Booking.findAll({where:{
        HotelId: id_hotel
    }})

    return bookingsHotel
}
//*-------- GET ALL BOOKINGS OF USER--------------
const getBookingUser = async(id_user) => {

    const bookingUser = await Booking.findAll({where:{
        UserId: id_user
    }})

    return bookingUser
}

//*-------- POST BOOKING ---------------------
const postBooking = async (body, id_user) => {
  const roomTypeIds = body.map(item => item.id);
  const roomTypes = await RoomType.findAll({ where: { id: roomTypeIds } });

  const updates = [];
  const bookings = [];

  for (let i = 0; i < body.length; i++) {
    const roomType = roomTypes.find(rt => rt.id === body[i].id);
    if(body[i].amount == 0) throw new Error("Debes mandar al menos 1")
    const newStock = roomType.stock - body[i].amount;

    if (newStock < 0) {
      throw new Error("No queda stock");
    }

    roomType.stock = newStock;
    updates.push(roomType.save());

    const bookingData = {
      amount: body[i].amount,
      price: roomType.price
    };
    bookings.push(bookingData);
  }

  await Promise.all(updates);

  const createdBookings = await Booking.bulkCreate(bookings);

  const user = await User.findByPk(id_user);
  await user.addBooking(createdBookings);

  for (let i = 0; i < body.length; i++) {
    const roomType = roomTypes.find(rt => rt.id === body[i].id);

    await roomType.addBooking(createdBookings[i]);

    const hotel = await Hotel.findByPk(roomType.HotelId);
    await hotel.addBooking(createdBookings[i]);
  }

  return "Todo joya!";
};


module.exports = {
    getAllBookings,
    getBookingUser,
    getBookingHotel,
    postBooking
}    