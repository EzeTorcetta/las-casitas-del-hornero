const { Router } = require("express");
const roomTypesRouter = Router();

const {
    getAllRoomTypesHandler,
    getRoomTypesHandler,
    createRoomTypesHandler,
    putRoomTypesHandler
} = require ("../handlers/roomTypesHandler")

roomTypesRouter.get("/", getAllRoomTypesHandler)
roomTypesRouter.get("/:id_hotel", getRoomTypesHandler)
roomTypesRouter.post("/:id_hotel", createRoomTypesHandler)
roomTypesRouter.put("/:id_roomtype", putRoomTypesHandler)

module.exports = roomTypesRouter;