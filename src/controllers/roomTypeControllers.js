//?----------------------------IMPORTS--------------------------------
const { RoomType, Hotel,Room } = require("../db");

//?----------------------------CONTROLLERS------------------------------

//*------------GET ALL TYPES ROOMS-------------------
const getAllRoomTypes = async () => {
  const roomTypes = await RoomType.findAll();

  return roomTypes ? roomTypes : new Error("Room types not found");
};

//*------------GET ALL TYPES ROOMS BY HOTEL ID-------------------
const getRoomTypesByHotel = async (id_hotel, checkIn, checkOut) => {
  checkIn = new Date(checkIn);
  checkOut = new Date(checkOut);

  const rooms = await Room.findAll({
    where: {
      HotelId: id_hotel,
    },
  });

  const roomsAvailable = rooms.filter((room) => {
    let bool = false;
    if (room.dates.length) {
      for (let i = 0; i < room.dates.length; i++) {
        if (room.dates[i] < checkIn && room.dates[i + 1] > checkOut) {
          bool = true;
        }
        if (checkOut < room.dates[0]) {
          bool = true;
          console.log(true);
        }
        if (checkIn > room.dates[room.dates.length - 1]) {
          bool = true;
          console.log(true);
        }
      }
    } else bool = true;
    return bool;
  });

  const typeRoomsId = roomsAvailable.map((room) => room.RoomTypeId);

  const typeRoomsCount = typeRoomsId.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const hotelRoomTypes = await RoomType.findAll({
    where: { HotelId: id_hotel },
  });

  const typerooms = hotelRoomTypes.map((roomType) => {
    const quantity = typeRoomsCount[roomType.id] || 0;
    
    return {
      id: roomType.id,
      people: roomType.people,
      price: roomType.price,
      name: roomType.name,
      image: roomType.image,
      hotelId: roomType.hotelId,
      stock: quantity,
    }
  });

  return typerooms
    ? typerooms
    : new Error("Hotel room types not found");
};

//*------------CREATE NEW ROOM TYPE-------------------
const createRoomTypesByHotel = async (
  { people, price, name, image,stock,id_user },
  id_hotel
) => {
  const hotelFind = await Hotel.findOne({
    where: {
      id: id_hotel,
      UserId: id_user
    },
  });

  if (!hotelFind) throw new Error("User not found or User is not Admin");

  const roomFind = await RoomType.findOne({
    where: {
      name: name,
      HotelId: id_hotel,
    },
  });

  if (roomFind) throw new Error("Room type already exists.");

  const newRoomType = await RoomType.create({
    people,
    price,
    name,
    image,
  });


  //* Creacion de rooms por cantidad de Stock de determinado tipo de habitacion
  const rooms = [];
  for (let i = 1; i <= stock; i++) {
    const newRoom = await Room.create({
      number: i,
    });
    rooms.push(newRoom);
    await newRoom.setRoomType(newRoomType);
  }
  
  await hotelFind.addRoomType(newRoomType);

  return newRoomType;
};

//! QUE HACEMOS CON ROOM DETAIL? TIENE SENTIDO HACER UN DETALLE DE C/ TIPO DE HABITACION ??
//*------------GET TYPE ROOM DETAIL-------------------
// const getDetailRoomType = async (typeRoomId) => {};

//*------------PUT TYPE ROOM-------------------

const putRoomType = async (id_roomtype,price,image) => {
  if(!id_roomtype){
    throw new Error("Error")
  }

  const roomTypeFind = await RoomType.findByPk(id_roomtype)


  if(!roomTypeFind){
    throw new Error("RoomType not found")
  }




  if (price && price > 0) {
    roomTypeFind.price = price;
  }
  
  
  if (image && typeof image === "string") {
    roomTypeFind.image = image;
  }
  


  await roomTypeFind.save();
  
  return;
}


module.exports = {
  getAllRoomTypes,
  getRoomTypesByHotel,
  createRoomTypesByHotel,
  putRoomType
};
