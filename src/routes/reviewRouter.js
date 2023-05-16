const { Router } = require("express");
const reviewRouter = Router();

const {
  postReviewHandler,
  getReviewHandler,
  deleteReviewHandler,
} = require("../handlers/reviewHandler");

reviewRouter.get("/:id_hotel", getReviewHandler);
reviewRouter.post("/:id_hotel", postReviewHandler);
reviewRouter.delete("/:id_review", deleteReviewHandler);
module.exports = reviewRouter;
