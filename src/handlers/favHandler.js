const {
  getFavs,
  postFav,
  deleteFav,
  deteleAllFavs,
} = require("../controllers/favControllers");

//* Handler que me trae todos los Favoritos
const getFavHandler = async (req, res) => {
  const { id_user } = req.params;
  try {
    const favs = await getFavs(id_user);
    res.status(200).json(favs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea el hotel fav en la DB
const postFavHandler = async (req, res) => {
  const { id_user, id_hotel } = req.params;
  try {
    await postFav(id_user, id_hotel);
    res.status(200).json("Hotel añadido con éxito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que elimina un fav del user en la DB
const deleteFavHandler = async (req, res) => {
  const { id_user, id_hotel } = req.params;
  try {
    await deleteFav(id_user, id_hotel);
    res.status(200).json("Hotel eliminado con éxito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que elimina todos los favs de un user en la DB
const deleteAllFavsHandler = async (req, res) => {
  const { id_user } = req.params;
  try {
    await deteleAllFavs(id_user);
    res.status(200).json("Todos los favoritos fueron eliminados");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFavHandler,
  postFavHandler,
  deleteFavHandler,
  deleteAllFavsHandler,
};
