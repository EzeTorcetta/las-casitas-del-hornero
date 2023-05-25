const {
  getCart,
  postCart,
  deleteCart,
  deleteAllCart,
  putAmountCart,
} = require("../controllers/cartControllers");

//* Handler que me trae todos los Favoritos
const getCartHandler = async (req, res) => {
  const { id_user } = req.params;
  const {checkIn, checkOut} = req.query

  try {
    const cart = await getCart(id_user, checkIn, checkOut);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea el hotel fav en la DB
const postCartHandler = async (req, res) => {
  const { id_user, id_roomtype } = req.params;
  try {
    await postCart(id_user, id_roomtype);
    res.status(200).json("Habitacion agregada con exito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que elimita una roomType del carrito
const deleteCartHandler = async (req, res) => {
  const { id_user, id_roomtype } = req.params;
  try {
    await deleteCart(id_user, id_roomtype);
    res.status(200).json("Habitacion removida con exito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que vacìa el carrito
const deleteAllCartHandler = async (req, res) => {
  const { id_user } = req.params;
  try {
    await deleteAllCart(id_user);
    res.status(200).json("El carro fue vaciado");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que modifica el  contador del cart indicado
const putAmountCartHandler = async (req, res) => {
  const { id_user, id_roomtype } = req.params;
  const { putAmount } = req.query;
  try {
    const AmountCart = await putAmountCart(id_user, id_roomtype, putAmount);
    res.status(200).json(AmountCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCartHandler,
  postCartHandler,
  deleteCartHandler,
  deleteAllCartHandler,
  putAmountCartHandler,
};
