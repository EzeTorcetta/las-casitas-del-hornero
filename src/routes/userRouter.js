const { Router } = require("express");
const userRouter = Router();

const { getUserHandler, postUserHandler } = require("../handlers/userHandler");

const checkUserProperties = (req, res, next) => {
  const { email, password, username, admin } = req.body;

  if (email && password && username && typeof admin === "boolean") {
    return postUserHandler(req, res, next);
  }

//   if (email && password && (typeof admin !== "boolean" || !username)) {
//     return res.status(400).json({ error: "Falta información en la solicitud" });
//   }

//   if (email && password && !admin && !username) {
//     return res.status(400).json({ error: "Falta información en la solicitud" });
//   }

//   if (email && password && typeof admin === "boolean") {
//     return postUserHandler(req, res, next);
//   }

  if (email && password) {
    return getUserHandler(req, res, next);
  }

  return res.status(400).json({ error: "Falta información en la solicitud" });
};

userRouter.post("/", checkUserProperties);

module.exports = userRouter;




// const { Router } = require("express");
// const userRouter = Router();

// const { getUserHandler, postUserHandler } = require("../handlers/userHandler");

// userRouter.get("/", getUserHandler); //enviamos por body el username y pass
// userRouter.post("/", postUserHandler);

// module.exports = userRouter;
