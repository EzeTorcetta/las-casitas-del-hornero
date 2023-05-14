//?----------------------------IMPORTS--------------------------------

const { User, Hotel } = require("../db");

//?----------------------------CONTROLLERS------------------------------

//*------------GET ALL FAVS-------------------
const getFavs = async (id_user) => {
  const user = await User.findByPk(id_user);
  const favs = await user.getHotels();
  return favs;
};
//*------------ADD FAV-------------------

const postFav = async (id_user, id_hotel) => {
  const user = await User.findByPk(id_user);
  const hotel = await Hotel.findByPk(id_hotel);
  await user.addHotel(hotel);
  return;
};

//*------------DELETE FAV-------------------

const deleteFav = async (id_user, id_hotel) => {
  const user = await User.findByPk(id_user);
  await user.removeHotel(id_hotel);
  return;
};

module.exports = {
  getFavs,
  postFav,
  deleteFav,
};
