const { Router } = require("express");

// import routers:
const hotelsRouter = require ("./hotelsRouter")
const favRouter = require ("./favRouter")
const userRouter = require ("./userRouter")
const roomTypesRouter = require ("./roomTypesRouter")


const router = Router();

//* RUTAS *//

router.use("/user", userRouter)
router.use("/hotels", hotelsRouter)
router.use("/favorites", favRouter)
router.use("/roomTypes", roomTypesRouter)

//****************************************/
module.exports = router;
