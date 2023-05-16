const { Hotel, User, Review } = require("../db");

const getReviews = () => {};

//*------------POST REVIEW-------------------

const postReviews = async (id_hotel, punctuation, review, username) => {
  const hotel = await Hotel.findByPk(id_hotel);

  const newReview = await Review.create({
    punctuation,
    review,
    username,
  });

  await hotel.addReview(newReview);

  const totalReviews = await Review.count({ where: { HotelId: id_hotel } });
 
  const currentValoration = hotel.valoration || 0;
  const newValoration =
    (currentValoration * totalReviews + punctuation) / (totalReviews + 1);

  hotel.valoration = newValoration;

  hotel.save();

  return;
};

//*------------DELETE REVIEW-------------------

const deleteReviews = async (id_review) => {
  const review = Review.findByPk(id_review);

  if (!review) {
    throw new Error("Review not found");
  } else {
    await Review.destroy({ where: { id: id_review } });
    return;
  }
};

module.exports = { getReviews, postReviews, deleteReviews };
