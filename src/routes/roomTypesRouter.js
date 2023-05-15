const { Router } = require("express");
const roomTypesRouter = Router();

const {
    getAllRoomTypesHandler,
    getRoomTypesHandler,
    createRoomTypesHandler
} = require ("../handlers/roomTypesHandler")

roomTypesRouter.get("/", getAllRoomTypesHandler)
roomTypesRouter.get("/:id_hotel", getRoomTypesHandler)
roomTypesRouter.post("/:id_hotel", createRoomTypesHandler)

module.exports = roomTypesRouter;