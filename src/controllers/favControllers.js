//?----------------------------IMPORTS--------------------------------

const { User, Hotel } = require("../db");

//?----------------------------CONTROLLERS------------------------------

//*------------GET ALL FAVS-------------------
const getFavs = async (id_user) => {
  const favs = await Favorites.findAll({
    where: {UserId: id_user}
  })

  const hotelsPromises = favs.map(async (fav) => {
    const hotel = await Hotel.findByPk(fav.HotelId);
    return hotel;
  });

  const hotels = await Promise.all(hotelsPromises);

  return hotels;
};

//*------------ADD FAV-------------------

const postFav = async (id_user, id_hotel) => {
  const user = await User.findByPk(id_user);
  const hotel = await Hotel.findByPk(id_hotel);
  await hotel.addUser(user);
  return;
};

//*------------DELETE FAV-------------------

const deleteFav = async (id_user, id_hotel) => {
 const hotel = await Hotel.findByPk(id_hotel);
  await hotel.removeUser(id_user);
  return;
};

module.exports = {
  getFavs,
  postFav,
  deleteFav,
};
