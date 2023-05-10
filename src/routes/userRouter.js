//! A MODIFICAR

const { Router } = require("express");
const userRouter = Router();

const { getUserHandler, postUserHandler } = require("../handlers/userHandler");

userRouter.get("/", getUserHandler); //enviamos por body el username y pass
userRouter.post("/", postUserHandler);

module.exports = userRouter;
