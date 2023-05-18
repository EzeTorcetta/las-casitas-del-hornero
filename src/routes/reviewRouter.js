const { Router } = require("express");
const reviewRouter = Router();

const {
  postReviewHandler,
  getReviewsHandler,
  deleteReviewHandler,
} = require("../handlers/reviewHandler");

reviewRouter.get("/:username", getReviewsHandler);
reviewRouter.post("/:id_hotel", postReviewHandler);
reviewRouter.delete("/:id_review", deleteReviewHandler);
module.exports = reviewRouter;
