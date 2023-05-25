const { Router } = require("express");
const reviewRouter = Router();

const {
  postReviewHandler,
  getReviewsHandler,
  deleteReviewHandler,
  deleteReviewUserHandler,
  putReviewHandler,
  getAllReviewsHotelHandler
} = require("../handlers/reviewHandler");

reviewRouter.get("/",getAllReviewsHotelHandler)
reviewRouter.get("/:username", getReviewsHandler);
reviewRouter.post("/:id_hotel", postReviewHandler);
reviewRouter.delete("/", deleteReviewUserHandler);
reviewRouter.delete("/:id_review", deleteReviewHandler);
reviewRouter.put("/", putReviewHandler);

module.exports = reviewRouter;
