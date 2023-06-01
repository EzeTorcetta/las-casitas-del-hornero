const { Booking, User, RoomType, Hotel, Cart, Room } = require("../db");

//*-------- GET ALL BOOKINGS-----------------

const getAllBookings = async (id_user) => {
  const findUser = await User.findByPk(id_user);

  if (!findUser.rol == 3) {
    throw new Error("Permiso denegado, no eres administrador");
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
          checkIn: booking.checkIn,
          checkOut: booking.checkOut
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
    throw new Error("Permiso denegado o el hotel no existe");
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
        checkIn: booking.checkIn,
        checkOut: booking.checkOut
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
        checkIn: booking.checkIn,
        checkOut: booking.checkOut
      };
    })
  );

  return bookings;
};

//*-------- POST BOOKING ---------------------
const postBooking = async (body, id_user, checkIn, checkOut) => {
  const userFind = await User.findByPk(id_user)

  if (!userFind) { throw new Error("Usuario no registrado") }

  const roomTypeIds = body.map((item) => item.id);
  const roomTypes = await RoomType.findAll({ where: { id: roomTypeIds } });


  checkIn = new Date(checkIn);
  checkOut = new Date(checkOut);

  checkIn.setDate(checkIn.getDate() + 1);
  checkOut.setDate(checkOut.getDate() + 1);
  // Completar array entre checkIn y checkOut:
  const resultado = (checkIn, checkOut) => {
    let dates = [];
    let currentDate = new Date(checkIn);

    while (currentDate <= checkOut) {
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();

      dates.push(year + '-' + month + '-' + day);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  const fechasx = resultado(checkIn, checkOut)



  const updates = [];
  const bookings = [];


  // recorrer cada roomType:
  for (let i = 0; i < body.length; i++) {
    // busca la  roomtype macheando el primer id de roomtype enviado por body
    const roomType = roomTypes.find((rt) => rt.id === body[i].id);

    if (body[i].amount == 0) throw new Error("La cantidad no puede ser 0");

    //Trae todas las habitaciones pertenecientes al RoomType
    const rooms = await Room.findAll({ where: { RoomTypeId: roomType.id } });

    // Se guardan en roomsAvailable todas las rooms disponibles del tipo de habitación en particular


    const roomsAvailable = rooms.filter((room) => {
      let bool = false;
      if (room.dates.length) {
        for (let j = 0; j < room.dates.length; j++) {
          if (room.dates[j] < checkIn && room.dates[j + 1] > checkOut) {
            bool = true
          }
          if (checkOut < room.dates[0]) { bool = true; };
          if (checkIn > room.dates[room.dates.length - 1]) { bool = true; }
        }
      }
      return bool;
    })




    // REVISAMOS QUE QUEDEN LA MISMA CANTIDAD O MAS HABITACIONES DISPONIBLES QUE LAS QUE EL WACHIN NECESITA
    const comprobacionStock = roomsAvailable.length - body[i].amount;

    // SI QUEDAN MENOS, ARROJAMOS UN ERROR (NO HAY STOCK!!!!!)
    if (comprobacionStock < 0) {
      throw new Error("No hay disponibilidad");
    };

    // Se actualizan las dates  de cada habitacion(room) y se ordenan
    for (let k = 0; k < body[i].amount; k++) {
      roomsAvailable[k].dates = [...roomsAvailable[k].dates, ...fechasx];
      roomsAvailable[k].dates.sort((date1, date2) => new Date(date1) - new Date(date2));

    };



    const checkInToString = checkIn.toString()
    const checkOutToString = checkOut.toString()

    // Pushea todas las rooms avaliables
    updates.push(...roomsAvailable);


    // crea la reserva y la pushea en bookingData
    const bookingData = {
      amount: body[i].amount,
      price: roomType.price,
      checkIn: checkInToString,
      checkOut: checkOutToString
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

  return fechasx.length-1;
};

//*-------- GET MONTHS BOOKING -----------------
const getMonthBookings = async (id_user) => {
  const findUser = await User.findByPk(id_user);

  if (findUser.rol !== 3) {
    throw new Error("Permiso denegado, no eres administrador");
  } else {
    const booking = await Booking.findAll();
    let order = [
      {
        name: "January",
        cant: 0
      },
      {
        name: "February",
        cant: 0
      },
      {
        name: "March",
        cant: 0
      },
      {
        name: "April",
        cant: 0
      },
      {
        name: "May",
        cant: 0
      },
      {
        name: "June",
        cant: 0
      },
      {
        name: "July",
        cant: 0
      },
      {
        name: "August",
        cant: 0
      },
      {
        name: "September",
        cant: 0
      },
      {
        name: "Octuber",
        cant: 0
      },
      {
        name: "November",
        cant: 0
      },
      {
        name: "December",
        cant: 0
      }
    ]

    for (let i = 0; i < booking.length; i++) {
      const date = booking[i].checkIn.split(" ");
      switch (date[1]) {
        case "Jan":
        order[0].cant += booking[i].amount;
        break;
      case "Feb":
        order[1].cant += booking[i].amount;
        break;
      case "Mar":
        order[2].cant += booking[i].amount;
        break;
      case "Apr":
        order[3].cant += booking[i].amount;
        break;
      case "May":
        order[4].cant += booking[i].amount;
        break;
      case "Jun":
        order[5].cant += booking[i].amount;
        break;
      case "Jul":
        order[6].cant += booking[i].amount;
        break;
      case "Aug":
        order[7].cant += booking[i].amount;
        break;
      case "Sep":
        order[8].cant += booking[i].amount;
        break;
      case "Oct":
        order[9].cant += booking[i].amount;
        break;
      case "Nov":
        order[10].cant += booking[i].amount;
        break;
      case "Dec":
        order[11].cant += booking[i].amount;
        break;
        default:
          break;
      }
    }

    order = order.sort((a, b) => b.cant - a.cant);
    return order;
  }
};

//*-------- GET PROVINCES BOOKING -----------------
const getProvinceBookings = async (id_user) => {

  const findUser = await User.findByPk(id_user);

  if (findUser.rol !== 3) throw new Error("Permiso denegado, no eres administrador");

  const findAllBooking = await Booking.findAll();
  const bookings = await Promise.all(
    findAllBooking.map(async (booking) => {
      const hotel = await Hotel.findByPk(booking.HotelId);
      return {
        amount: booking.amount,
        province: hotel.province,
      };
    })
  );

  let order = [
    {
      name: "Buenos Aires",
      cant: 0
    },
    {
      name: "Ciudad Autónoma de Buenos Aires",
      cant: 0
    },
    {
      name: "Catamarca",
      cant: 0
    },
    {
      name: "Chaco",
      cant: 0
    },
    {
      name: "Chubut",
      cant: 0
    },
    {
      name: "Córdoba",
      cant: 0
    },
    {
      name: "Corrientes",
      cant: 0
    },
    {
      name: "Entre Ríos",
      cant: 0
    },
    {
      name: "Formosa",
      cant: 0
    },
    {
      name: "Jujuy",
      cant: 0
    },
    {
      name: "La Pampa",
      cant: 0
    },
    {
      name: "La Rioja",
      cant: 0
    },
    {
      name: "Mendoza",
      cant: 0
    },
    {
      name: "Misiones",
      cant: 0
    },
    {
      name: "Neuquén",
      cant: 0
    },
    {
      name: "Río Negro",
      cant: 0
    },
    {
      name: "Salta",
      cant: 0
    },
    {
      name: "San Juan",
      cant: 0
    },
    {
      name: "San Luis",
      cant: 0
    },
    {
      name: "Santa Cruz",
      cant: 0
    },
    {
      name: "Santa Fe",
      cant: 0
    },
    {
      name: "Santiago del Estero",
      cant: 0
    },
    {
      name: "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
      cant: 0
    },
    {
      name: "Tucumán",
      cant: 0
    }
  ];


  for (let i = 0; i < bookings.length; i++) {
    console.log(bookings[i]);
    switch (bookings[i].province) {
      case "Buenos Aires":
        order[0].cant += bookings[i].amount;
        break;
      case "Ciudad Autónoma de Buenos Aires":
        order[1].cant += bookings[i].amount;
        break;
      case "Catamarca":
        order[2].cant += bookings[i].amount;
        break;
      case "Chaco":
        order[3].cant += bookings[i].amount;
        break;
      case "Chubut":
        order[4].cant += bookings[i].amount;
        break;
      case "Córdoba":
        order[5].cant += bookings[i].amount;
        break;
      case "Corrientes":
        order[6].cant += bookings[i].amount;
        break;
      case "Entre Ríos":
        order[7].cant += bookings[i].amount;
        break;
      case "Formosa":
        order[8].cant += bookings[i].amount;
        break;
      case "Jujuy":
        order[9].cant += bookings[i].amount;
        break;
      case "La Pampa":
        order[10].cant += bookings[i].amount;
        break;
      case "La Rioja":
        order[11].cant += bookings[i].amount;
        break;
      case "Mendoza":
        order[12].cant += bookings[i].amount;
        break;
      case "Misiones":
        order[13].cant += bookings[i].amount;
        break;
      case "Neuquén":
        order[14].cant += bookings[i].amount;
        break;
      case "Río Negro":
        order[15].cant += bookings[i].amount;
        break;
      case "Salta":
        order[16].cant += bookings[i].amount;
        break;
      case "San Juan":
        order[17].cant += bookings[i].amount;
        break;
      case "San Luis":
        order[18].cant += bookings[i].amount;
        break;
      case "Santa Cruz":
        order[19].cant += bookings[i].amount;
        break;
      case "Santa Fe":
        order[20].cant += bookings[i].amount;
        break;
      case "Santiago del Estero":
        order[21].cant += bookings[i].amount;
        break;
      case "Tierra del Fuego, Antártida e Islas del Atlántico Sur":
        order[22].cant += bookings[i].amount;
        break;
      case "Tucumán":
        order[23].cant += bookings[i].amount;
        break;
      default:
        break;
    }
  }

  
 
  order = order.sort((a, b) => b.cant - a.cant);
  return order;
}

//*-------- GET USER BOOKING -----------------
const getUserBookings = async (id_user) => {
  const findUser = await User.findByPk(id_user);

  if (findUser.rol != 3) throw new Error("Permiso denegado, no eres administrador");

  const booking = await Booking.findAll();
  let users = [];
 
  for (let i = 0; i < booking.length; i++) {
    let cant = 0;

    if (!users.find(user => user.user == booking[i].UserId)) {

      for (let j = 0; j < booking.length; j++) {
        
        if (booking[i].UserId == booking[j].UserId) {
          cant += booking[j].amount;
        };

      };
      if(!users.find(user => user.user == booking[i].UserId)){
        users.push({
          user: booking[i].UserId,
          cant
        });
      }
    }
  };  

  users = users.sort((a, b) => b.cant - a.cant);
  users = await Promise.all(users.map(async (user) => {
    user.user = await User.findByPk(user.user);
    return user;
  }));

  return users;

};

//*-------- GET MOST BOOKING BY PARTNER ----------------- 
const getMostBookingPartner = async (id_user) => {
  const findUser = await User.findByPk(id_user);
  if (findUser.rol != 2) throw new Error("Permiso denegado, no eres partner");

  const booking = await Booking.findAll();
  let hotels = []
  //Creo el primer for para recorrer todos los bookings
  for (let i = 0; i < booking.length; i++) {
    let cant = 0;
    //Pregunto si existe order o si ya existe en order una variable que se llame como el id del hotel.
    if (!hotels.find(hotel => hotel.hotel == booking[i].HotelId)) {
      //Si no existe recorro de nuevo booking para contar la cantidad de veces que aparecio ese nombre 
      for (let j = 0; j < booking.length; j++) {
        if (booking[i].HotelId == booking[j].HotelId) {
          cant += booking[j].amount;
        }
      }
      //realizo un push con el nombre y la cantidad
      if(!hotels.find(hotel => hotel.hotel == booking[i].HotelId)){
        hotels.push({
          hotel: booking[i].HotelId,
          cant
        });
      }
    }
    //Si existe el nombre en el order, entonces se saltea ese booking[i]
    else break;
  };

  //Una vez que tengo todos los nombre de los hoteles y sus cantidades, los ordeno de mas acantidad a menos cantidad.
  hotels.sort((hotelA, HotelB) => HotelB.cant - hotelA.cant);

  //Por ultimo realizo un map y busco todos los hoteles con esos ID
  hotels = await Promise.all (hotels.map(async (hotel)=>{
    hotel.hotel = await Hotel.findByPk(hotel.hotel);
    return {
      hotel: hotel.hotel.dataValues,
      cant: hotel.cant
    };
  }));

  const hotelsAdmin = [];

  for (let i=0;i<hotels.length; i++){
    if(hotels[i].hotel.UserId == id_user){
      hotelsAdmin.push(hotels[i]);
    };
  };

  return hotelsAdmin;
}

//*-------- GET MORE BOOKING BY PARTNER -----------------
const getMonthBookingPartner = async (id_user) => {
  const findUser = await User.findByPk(id_user);
  if (findUser.rol != 2) throw new Error("Permiso denegado, no eres partner");

  let bookingAll = await Booking.findAll();

  let booking = [];
  for(let i=0;i<bookingAll.length;i++){
    const hotel = await Hotel.findByPk(bookingAll[i].HotelId);
    if (hotel.UserId == id_user){
      booking.push(bookingAll[i]);
    }
  }

  let order = [
    {
      name: "January",
      cant: 0
    },
    {
      name: "February",
      cant: 0
    },
    {
      name: "March",
      cant: 0
    },
    {
      name: "April",
      cant: 0
    },
    {
      name: "May",
      cant: 0
    },
    {
      name: "June",
      cant: 0
    },
    {
      name: "July",
      cant: 0
    },
    {
      name: "August",
      cant: 0
    },
    {
      name: "September",
      cant: 0
    },
    {
      name: "Octuber",
      cant: 0
    },
    {
      name: "November",
      cant: 0
    },
    {
      name: "December",
      cant: 0
    }
  ]

  for (let i = 0; i < booking.length; i++) {
    const date = booking[i].checkIn.split(" ");
    switch (date[1]) {
      case "Jan":
        order[0].cant += booking[i].amount;
        break;
      case "Feb":
        order[1].cant += booking[i].amount;
        break;
      case "Mar":
        order[2].cant += booking[i].amount;
        break;
      case "Apr":
        order[3].cant += booking[i].amount;
        break;
      case "May":
        order[4].cant += booking[i].amount;
        break;
      case "Jun":
        order[5].cant += booking[i].amount;
        break;
      case "Jul":
        order[6].cant += booking[i].amount;
        break;
      case "Aug":
        order[7].cant += booking[i].amount;
        break;
      case "Sep":
        order[8].cant += booking[i].amount;
        break;
      case "Oct":
        order[9].cant += booking[i].amount;
        break;
      case "Nov":
        order[10].cant += booking[i].amount;
        break;
      case "Dec":
        order[11].cant += booking[i].amount;
        break;
      default:
        break;
    }
  }

  order = order.sort((a, b) => b.cant - a.cant);
  return order;
};

module.exports = {
  getAllBookings,
  getBookingUser,
  getBookingHotel,
  postBooking,
  getProvinceBookings,
  getMonthBookings,
  getMostBookingPartner,
  getUserBookings,
  getMonthBookingPartner
};
