const {
  getReviews,
  postReviews,
  deleteReviews,
} = require("../controllers/reviewsControllers");

//* Handler que trae todas las review del  user
const getReviewsHandler = async (req, res) => {
  const { username } = req.params;
  try {
    const reviews = await getReviews(username);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea la review al hotel enviado por params

const postReviewHandler = async (req, res) => {
  const { id_hotel } = req.params;
  const { punctuation, review, username } = req.body;
  try {
    await postReviews(id_hotel, punctuation, review, username);
    res.status(200).json("Review published successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que borra la review recibiendo el id por params

const deleteReviewHandler = async (req, res) => {
  const { id_review } = req.params;
  try {
    await deleteReviews(id_review);
    res.status(200).json("Review successfully removed");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postReviewHandler,

  deleteReviewHandler,
  getReviewsHandler,
};