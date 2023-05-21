const { Hotel, Review, Booking, User } = require("../db");

//*----------GET ONE USER REVIEWS----------------------
const getReviews = async (username) => {
  const allReviewsUser = await Review.findAll({
    where: {
      username,
    },
  });

  return allReviewsUser;
};

//*----------GET ONE USER REVIEWS---------------------- Ni idea para que chota hice este
const getReviewsHotel = async (username) => {
  const allReviewsUser = await Review.findAll({
    where: {
      username,
    },
  });

  return allReviewsUser;
};

//*------------POST REVIEW-------------------

const postReviews = async (id_hotel, punctuation, review, username) => {
  const hotel = await Hotel.findByPk(id_hotel);
  const findUser = await User.findOne({
    where: {
      username,
    },
  });

  const checkUser = await Booking.findOne({
    where: {
      UserId: findUser.id,
      HotelId: hotel.id,
    },
  });

  if (!checkUser) {
    throw new Error("You must make a reservation first!!");
  }

  const findUser2 = await Review.findOne({
    where: {
      username,
      HotelId: id_hotel,
    },
  });

  if (findUser2) {
    throw new Error("You cannot post more than one review of the same hotel");
  }

  const newReview = await Review.create({
    punctuation,
    review,
    username,
  });

  await hotel.addReview(newReview);

  const totalReviews = await Review.count({ where: { HotelId: id_hotel } });

  const currentValoration = hotel.valoration;

  const newValoration =
    (currentValoration * totalReviews + punctuation) / (totalReviews + 1);

  hotel.valoration = newValoration;

  hotel.save();

  return;
};

//*------------DELETE REVIEW-------------------

const deleteReviews = async (id_review) => {
  const review = await Review.findByPk(id_review);

  if (!review) {
    throw new Error("Review not found");
  } else {
    await Review.destroy({ where: { id: id_review } });
  }

  const hotel = await Hotel.findByPk(review.HotelId);

  let promedioActual = hotel.valoration;

  let totalReviews = await Review.count({
    where: { HotelId: review.HotelId },
  });

  let promedionuevo = promedioActual * (totalReviews + 2) - review.punctuation;

  hotel.valoration = promedionuevo;

  hotel.save();

  return;
};

const deleteReviewUser = async (username, id_review) => {
  if (!username || !id_review) {
    throw new Error("Error");
  }

  const review = await Review.findOne({
    where: {
      id: id_review,
      username,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  } else {
    const hotel = await Hotel.findByPk(review.HotelId);

    await Review.destroy({
      where: {
        id: id_review,
        username,
      },
    });

    let promedioActual = hotel.valoration;

    let totalReviews = await Review.count({
      where: { HotelId: review.HotelId },
    });

    let promedionuevo =
      promedioActual * (totalReviews + 2) - review.punctuation;

    hotel.valoration = promedionuevo;

    hotel.save();

    return;
  }
};

const putReview = async (username, id_review, punctuation, review) => {
  if (!username || !id_review) {
    throw new Error("Error");
  }

  const reviewPut = await Review.findOne({
    where: {
      id: id_review,
      username,
    },
  });

  const hotel = await Hotel.findByPk(reviewPut.HotelId);

  if (!review) {
    throw new Error("Review not found");
  } else {
    if (punctuation) {
      let puntActual = reviewPut.punctuation;

      let totalReviews = await Review.count({
        where: { HotelId: reviewPut.HotelId },
      });

      let valoracionHotel = hotel.valoration;

      let sumaprom = ((((valoracionHotel * (totalReviews + 1)) - puntActual) + punctuation) /( totalReviews + 1))


      hotel.valoration = sumaprom;

      hotel.save();

      reviewPut.punctuation = punctuation;
    }

    if (review) {
      reviewPut.review = review;
    }

    reviewPut.save();
  }

  return;
};

module.exports = {
  getReviews,
  postReviews,
  deleteReviews,
  deleteReviewUser,
  putReview,
};
