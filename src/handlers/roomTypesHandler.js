const {
  getAllRoomTypes,
  getRoomTypesByHotel,
  createRoomTypesByHotel,
  putRoomType
} = require("../controllers/roomTypeControllers");

//* Handler que trae todos los tipos de habitación
const getAllRoomTypesHandler = async (req, res) => {
  try {
    const allRoomTypes = await getAllRoomTypes();
    res.status(200).json(allRoomTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que trae todos los tipos de habitación de un hotel (por id_hotel)
const getRoomTypesHandler = async (req, res) => {
  const { id_hotel } = req.params;
  const { checkIn, checkOut } = req.query

  try {
    const roomType = await getRoomTypesByHotel(id_hotel, checkIn, checkOut);
    res.status(200).json(roomType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea todos los tipos de habitación de un hotel (por id_hotel)
const createRoomTypesHandler = async (req, res) => {
  const { id_hotel } = req.params;
  const { people, price, name, image, stock, id_user } = req.body;

  try {
    const roomTypeCreated = await createRoomTypesByHotel(
      { people, price, name, image, stock, id_user },
      id_hotel
    );
    res.status(200).json(roomTypeCreated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que modifica las propiedades de una RoomType
const putRoomTypesHandler = async (req, res) => {
  const { id_roomtype } = req.params
  const { price, image, id_user } = req.body


  try {

    await putRoomType(id_roomtype, price, image, id_user)

    res.status(200).json("Tipo de habitacion modificada con exito")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
  getAllRoomTypesHandler,
  getRoomTypesHandler,
  createRoomTypesHandler,
  putRoomTypesHandler
};
