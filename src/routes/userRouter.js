const { Router } = require("express");
const userRouter = Router();

const {
  getUserHandler,
  postUserHandler,
  getAllUsersHandler,
  putRolUserHandler,
  putPasswordUserHandler
} = require("../handlers/userHandler");

const checkUserProperties = (req, res, next) => {
  const { email, password, username } = req.body;

  if (email && password && username) {
    return postUserHandler(req, res, next);
  }

  if (email && password) {
    return getUserHandler(req, res, next);
  }

  return res.status(400).json({ error: "Falta información en la solicitud" });
};

userRouter.post("/", checkUserProperties);
userRouter.get("/:id_user", getAllUsersHandler);
userRouter.put("/password", putPasswordUserHandler)
userRouter.put("/", putRolUserHandler);
module.exports = userRouter;

// const { Router } = require("express");
// const userRouter = Router();

// const { getUserHandler, postUserHandler } = require("../handlers/userHandler");

// userRouter.get("/", getUserHandler); //enviamos por body el username y pass
// userRouter.post("/", postUserHandler);

// module.exports = userRouter;
