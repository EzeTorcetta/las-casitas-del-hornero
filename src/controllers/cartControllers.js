//?----------------------------IMPORTS--------------------------------

const { User, RoomType, Cart, Hotel, Room} = require("../db");

//?----------------------------CONTROLLERS------------------------------

//*------------ GET CART OF USER -------------------
const getCart = async (id_user, checkIn, checkOut) => {

  // traigo el cart del usuario
  const cart = await Cart.findAll({
    where: { UserId: id_user },
  });


  
  
  // guardamos en carts todos los roomtypes con la cantidad y stock 🛒🛒
  const finalCart = await Promise.all(

    // se recorre el carrito y devuelve por cada elemento el amount y stock (además de los otros datos)
    cart.map(async (item) => {
      const roomtype = await RoomType.findByPk(item.RoomTypeId);
      const hotel = await Hotel.findByPk(roomtype.HotelId);
      
      const rooms = await Room.findAll({
        where: {
          RoomTypeId: roomtype.id,
        },
      });
      
      if (checkIn && checkOut){ 

     checkIn = new Date(checkIn);
     checkOut = new Date(checkOut);
     
    // Se filtran las habitaciones disponibles
    const roomsAvailable = rooms.filter((room) => {
      let bool = false;
      if (room.dates.length) {
        for (let i = 0; i < room.dates.length; i++) {
          if (room.dates[i] < checkIn && room.dates[i + 1] > checkOut) {
            bool = true;
          }
          if (checkOut < room.dates[0]) {
            bool = true;
           ;
          }
          if (checkIn > room.dates[room.dates.length - 1]) {
            bool = true;
            ;
          }
        }
      } else bool = true;
      return bool;
    });

      return {
        ...roomtype.toJSON(),
        amount: item.amount,
        hotelName: hotel.name,
        stock: roomsAvailable.length,
        filtered: true
      }
    }else{
      return {
        ...roomtype.toJSON(),
        amount: item.amount,
        hotelName: hotel.name,
        stock: 0,
        filtered: false
      }
    }  
    })
  );

  //se ordena el carrito para que no baile todo
 const sortedCart = finalCart.sort((a, b) => {


    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });


  if (sortedCart.length) return sortedCart;
  else throw new Error("El carrito esta vacio");
};

//*------------ ADD ITEM IN CART  -------------------

const postCart = async (id_user, id_roomtype) => {
  const user = await User.findByPk(id_user);

  const room = await RoomType.findByPk(id_roomtype);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (!room) {
    throw new Error("Habitacion no encontrada");
  }

  const findCart = await Cart.findOne({
    where: {
      UserId: user.id,
      RoomTypeId: room.id,
    },
  });

  if (findCart) {
    throw new Error("Habitacion agregada!");
  }
  const cart = await Cart.create({
    UserId: user.id,
    RoomTypeId: room.id,
  });
  return cart;
};

//*------------ DELETE ITEM OF CART -------------------

const deleteCart = async (id_user, id_roomtype) => {
  const user = await User.findByPk(id_user);
  const room = await RoomType.findByPk(id_roomtype);
  if (!room) {
    throw new Error("Habitacion no encontrada");
  }

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  await Cart.destroy({
    where: {
      UserId: user.id,
      RoomTypeId: room.id,
    },
  });
  return;
};

//*------------ DELETE ALL ITEMS OF CART -------------------

const deleteAllCart = async (id_user) => {
  await Cart.destroy({
    where: { UserId: id_user },
  });

  return;
};


//*------------ PUT AMOUNT OF ITEMS CART -------------------


const putAmountCart = async (id_user, id_roomtype, putAmount) => {
  const room = await Cart.findOne({
    where: {
      UserId: id_user,
      RoomTypeId: id_roomtype,
    },
  });
  if (!room) {
    throw new Error("Habitacion no encontrada");
  }

  if (putAmount === "up") {
    room.amount++;
    await room.save();
  }

  if (putAmount === "down" && room.amount > 1) {
    room.amount--;
    await room.save();
  }

  return room.amount;
};

module.exports = {
  getCart,
  postCart,
  deleteCart,
  deleteAllCart,
  putAmountCart,
};
