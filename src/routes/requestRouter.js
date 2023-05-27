const { Router } = require("express");
const requestRouter = Router();

const { getRequestHandler,
    postRequestHandler,
    deleteRequestHandler
} = require("../handlers/requestHandler")


requestRouter.get("/:id_user", getRequestHandler);
requestRouter.post("/", postRequestHandler);
requestRouter.delete("/:id_user", deleteRequestHandler);




module.exports = requestRouter;