const { createRooms, deleteRooms } = require("../controllers/roomsControllers")

//* handler para crear habitaciones de un tipo en particular
const postRoomsHandler = async (req, res) => {
    const {id_roomType, stock,id_user} = req.body
    try {
        const newRooms = await createRooms(id_roomType, stock,id_user);
        res.status(200).json(newRooms)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//* borrar todas las habitaciones de un tipo en particular
const deleteRoomsHandler = async (req, res) => {
    const {id_roomType,id_user} = req.body
    try {
        await deleteRooms(id_roomType,id_user);
        res.status(200).json("Habitacion eliminada con exito")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {
    postRoomsHandler,
    deleteRoomsHandler
}