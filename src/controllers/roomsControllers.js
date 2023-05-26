//?----------------------------IMPORTS--------------------------------
const { RoomType, Room,Hotel } = require("../db");


//?----------------------------CONTROLLERS------------------------------


//*------ CREATE NEW ROOMS-------------------------
const createRooms = async(id_roomType, stock,id_user) => {

    const roomType = await RoomType.findByPk(id_roomType)
    const hotel = await Hotel.findOne({where:{
      id:roomType.HotelId,
      UserId: id_user
    }})

    if(!hotel) throw new Error("El usuario no tiene permisos para realizar esta acción")


    if (!roomType) throw new Error("El tipo de habitación no existe.");


    const lastRoom = await Room.findOne({
        where: {RoomTypeId: id_roomType},
        order: [["number", "DESC"]],
      });
  
      let lastRoomNumber = 0;
  
      if (lastRoom) {
        lastRoomNumber = lastRoom.number;
      }
  
      // Generar las habitaciones adicionales
      for (let i = 1; i <= stock; i++) {
        const roomNumber = lastRoomNumber + i;
       const newRoom = await Room.create({ number: roomNumber });
      
        await roomType.addRoom(newRoom)
        await hotel.addRoom(newRoom)
      }

    
    const newRooms = await Room.findAll({where: {RoomTypeId: id_roomType}})
    if(!newRooms.length) throw new Error("Algo salió mal")
    return newRooms;
}


//*------ DELETE ALL ROOMS  -------------------------
const deleteRooms = async(id_roomType,id_user) => {
  const hotel = await Hotel.findOne({where:{
    id:roomType.HotelId,
    UserId: id_user
  }})

  if(!hotel) throw new Error("El usuario no tiene permisos para realizar esta acción")


    const roomType = await RoomType.findByPk(id_roomType)
    if (!roomType) throw new Error("El tipo de habitación no existe.");

    await Room.destroy({
        where: {RoomTypeId:id_roomType}
    })
    return
}

module.exports = {createRooms, deleteRooms}