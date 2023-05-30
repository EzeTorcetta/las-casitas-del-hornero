const { Router } = require("express");

// import routers:
const hotelsRouter = require("./hotelsRouter");
const favRouter = require("./favRouter");
const userRouter = require("./userRouter");
const roomTypesRouter = require("./roomTypesRouter");
const servicesRouter = require("./servicesRouter");
const locationsRouter = require("./locationsRouter");
const cartRouter = require("./cartRouter");
const reviewRouter = require("./reviewRouter");
const NodeMailerRouter = require("./NodeMailerRouter");
const bookingRouter = require("./bookingRouter");
const roomsRouter = require("./roomsRouter");
const requestRouter = require("./requestRouter")
const mercadoPagoRouter = require("./mercadoPagoRouter")
const router = Router();

//* RUTAS *//
router.use("/email", NodeMailerRouter);
router.use("/user", userRouter);
router.use("/hotels", hotelsRouter);
router.use("/favorites", favRouter);
router.use("/roomTypes", roomTypesRouter);
router.use("/services", servicesRouter);
router.use("/locations", locationsRouter);
router.use("/cart", cartRouter);
router.use("/review", reviewRouter);
router.use("/booking", bookingRouter);
router.use("/rooms", roomsRouter);
router.use("/request", requestRouter);
router.use("/payment", mercadoPagoRouter)


//****************************************/
module.exports = router;
