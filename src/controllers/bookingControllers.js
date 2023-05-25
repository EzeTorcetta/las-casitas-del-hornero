const { Booking, User, RoomType, Hotel, Cart,Room } = require("../db");

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
  const bookings = await Promise.all(
    bookingsHotel.map(async (booking) => {
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
};

//*-------- GET ALL BOOKINGS OF USER--------------
const getBookingUser = async (id_user) => {
  const bookingUser = await Booking.findAll({
    where: {
      UserId: id_user,
    },
  });

  const bookings = await Promise.all(
    bookingUser.map(async (booking) => {
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
};

//*-------- POST BOOKING ---------------------
const postBooking = async (body, id_user,checkIn,checkOut) => {
  const userFind = await User.findByPk(id_user)

  if(!userFind){ throw  new Error("User not register")}

  const roomTypeIds = body.map((item) => item.id);
  const roomTypes = await RoomType.findAll({ where: { id: roomTypeIds } });

  checkIn = new Date(checkIn);
  checkOut = new Date(checkOut);

  // Completar array entre checkIn y checkOut:
  const resultado = (checkIn, checkOut) => {
    var dates = [];
    var currentDate = checkIn;

    while (currentDate <= checkOut) {
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth() + 1; 
      var day = currentDate.getDate();
      dates.push(year + '-' + month + '-' + day);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  
  const updates = [];
  const bookings = [];

  // recorrer cada roomType:
  for (let i = 0; i < body.length; i++) {
    // busca la  roomtype macheando el primer id de roomtype enviado por body
    const roomType = roomTypes.find((rt) => rt.id === body[i].id);

    if (body[i].amount == 0) throw new Error("Quantity cannot be 0");

    //Trae todas las habitaciones pertenecientes al RoomType
    const rooms = await Room.findAll({where:{ RoomTypeId: roomType.id}});

 
    // Se guardan en roomsAvailable todas las rooms disponibles del tipo de habitación en particular
    const roomsAvailable = rooms.filter((room)=>{
      let bool = false;
      if(room.dates.length){
        for (let j=0;j<room.dates.length; j++){
          if(room.dates[j] < checkIn && room.dates[j+1] > checkOut){ 
            bool = true
          }
          if(checkOut<room.dates[0]){bool=true; console.log(true)};               //! BORRAR COLSOLE.LOG
          if(checkIn>room.dates[room.dates.length-1]){bool=true;console.log(true)}   // ! BORRAR COLSOLE.LOG
        }
      }
      else bool = true;
      return bool;
    })

    // REVISAMOS QUE QUEDEN LA MISMA CANTIDAD O MAS HABITACIONES DISPONIBLES QUE LAS QUE EL WACHIN NECESITA
    const comprobacionStock = roomsAvailable.length - body[i].amount;
    
    // SI QUEDAN MENOS, ARROJAMOS UN ERROR (NO HAY STOCK!!!!!)
    if (comprobacionStock < 0 ) {
      throw new Error("Out of stock"); 
    };

    // Se actualizan las dates  de cada habitacion(room) y se ordenan
    for (let k=0;k<body[i].amount-1;k++){
      roomsAvailable[k].dates = [...roomsAvailable[k].dates, ...resultado];
      roomsAvailable[k].dates.sort((date1, date2) => date1 - date2);
    };

    
    const checkInToString = checkIn.toString()
    const checkOutToString = checkOut.toString()

    // Pushea todas las rooms avaliables
    updates.push(roomsAvailable);
    
    // crea la reserva y la pushea en bookingData
    const bookingData = {
      amount: body[i].amount,
      price: roomType.price,
      checkIn : checkInToString,
      checkOut : checkOutToString
    };
    bookings.push(bookingData);
  }
  
  await Promise.all(updates); // creo que no sirve ni pa mierda
  
  // se guardan las actualizaciones de las dates de cada habitacion
  await updates.map((rooms) => rooms.save());  

  // crea todas las reservas en la DB
  const createdBookings = await Booking.bulkCreate(bookings);

  // se advincula el user con las reservas
  const user = await User.findByPk(id_user);
  await user.addBooking(createdBookings);

  
  for (let i = 0; i < body.length; i++) {
    const roomType = roomTypes.find((rt) => rt.id === body[i].id);
    // se advincula las roomtype con las reservas
    await roomType.addBooking(createdBookings[i]);

    const hotel = await Hotel.findByPk(roomType.HotelId);
     // se advincula el hotel con las reservas
    await hotel.addBooking(createdBookings[i]);

    // se vacía el carrito uwu
    await Cart.destroy({
      where: {
        UserId: id_user,
        RoomTypeId: body[i].id,
      },
    });
  }

  return "Reservation made successfully";
};

module.exports = {
  getAllBookings,
  getBookingUser,
  getBookingHotel,
  postBooking,
};
