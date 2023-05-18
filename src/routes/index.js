const { Router } = require("express");

// import routers:
const hotelsRouter = require("./hotelsRouter");
const favRouter = require("./favRouter");
const userRouter = require("./userRouter");
const roomTypesRouter = require("./roomTypesRouter");
const servicesRouter = require("./servicesRouter");
const cartRouter = require("./cartRouter");
const reviewRouter = require("./reviewRouter");
const bookingRouter = require("./bookingRouter");
const router = Router();

//* RUTAS *//

router.use("/user", userRouter);
router.use("/hotels", hotelsRouter);
router.use("/favorites", favRouter);
router.use("/roomTypes", roomTypesRouter);
router.use("/services", servicesRouter);
router.use("/cart", cartRouter);
router.use("/review", reviewRouter);
router.use("/booking", bookingRouter);

//****************************************/
module.exports = router;
