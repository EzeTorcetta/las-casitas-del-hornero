const {
  getReviews,
  postReviews,
  deleteReviews,
  deleteReviewUser,
  putReview,
 
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

//* Handler que trae todas las review del hotel (para el hotel Detail) 😎😋😎

const getAllReviewsHotelHandler = async (req,res) => {
  const {id_hotel} = req.query
  try {
    const reviews = await getAllReviewsHotel(id_hotel)
    res.status(200).json(reviews)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//* Handler que postea la review al hotel enviado por params

const postReviewHandler = async (req, res) => {
  const { id_hotel } = req.params;
  const { punctuation, review, username } = req.body;
  try {
    await postReviews(id_hotel, punctuation, review, username);
    res.status(200).json("Reseña publicada con éxito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que borra la review recibiendo el id por params

const deleteReviewHandler = async (req, res) => {
  const { id_review } = req.params;
  try {
    await deleteReviews(id_review);
    res.status(200).json("Reseña eliminada con éxito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que borra el review del usuario

const deleteReviewUserHandler = async (req, res) => {
  const { username, id_review } = req.query;

  try {
    await deleteReviewUser(username, id_review);
    res.status(200).json("Reseña eliminada con éxito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que modifica la review indicada

const putReviewHandler = async (req, res) => {
  const { username, id_review, punctuation, review } = req.body;
  try {
    await putReview(username, id_review, punctuation, review);
    res.status(200).json("Reseña modificada con éxito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  postReviewHandler,
  deleteReviewUserHandler,
  deleteReviewHandler,
  getReviewsHandler,
  putReviewHandler,
  getAllReviewsHotelHandler

};
