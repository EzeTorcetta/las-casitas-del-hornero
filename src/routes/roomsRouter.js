const { Router } = require("express");
const roomsRouter = Router();

const{postRoomsHandler, deleteRoomsHandler} = require("../handlers/roomsHandler")

roomsRouter.post("/", postRoomsHandler)
roomsRouter.delete("/", deleteRoomsHandler)

module.exports = roomsRouter;