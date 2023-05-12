//?----------------------------IMPORTS--------------------------------
const { RoomType,Hotel } = require("../db");

//?----------------------------CONTROLLERS------------------------------

//*------------GET ALL TYPES ROOMS-------------------
const getAllRoomTypes = async () => {
    const roomTypes = await RoomType.findAll()

    return roomTypes? roomTypes : new Error("Room types not found") 
};

//*------------GET ALL TYPES ROOMS BY HOTEL ID-------------------
const getRoomTypesByHotel = async (id_hotel) => {
    const hotelRoomTypes = await RoomType.findAll({
        where: {HotelId: id_hotel}
    });

    return hotelRoomTypes? hotelRoomTypes : new Error("Hotel room types not found")
};


//*------------CREATE NEW ROOM TYPE-------------------
const createRoomTypesByHotel = async ({ people, price, name }, id_hotel) => {

    hotelFind = await Hotel.findOne({
        where: {
          id_hotel,
        },
      });
    
       if(!hotelFind) throw new Error("User not found or User is not Admin")

      
    const newRoomType = await RoomType.create({
        people,
        price,
        name
    })

    await hotelFind.addRoomType(newRoomType);

    return newRoomType;
};




//! QUE HACEMOS CON ROOM DETAIL? TIENE SENTIDO HACER UN DETALLE DE C/ TIPO DE HABITACION ??
//*------------GET TYPE ROOM DETAIL-------------------
// const getDetailRoomType = async (typeRoomId) => {};


module.exports = {
    getAllRoomTypes,
    getRoomTypesByHotel,
    createRoomTypesByHotel
}
