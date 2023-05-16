const {
    getCart,
    postCart,
    deteleCart,
  } = require("../controllers/cartControllers");
  
  //* Handler que me trae todos los Favoritos
  
  const getCartHandler = async (req, res) => {
    const { id_user } = req.params;
    console.log(id_user);
    try {
      const cart = await getCart(id_user);
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
      res.status(200).json("Room successfully added");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteCartHandler = async (req, res) => {
    const { id_user, id_roomtype } = req.params;
    try {
      await deteleCart(id_user, id_roomtype);
      res.status(200).json("Room successfully removed");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    getCartHandler,
  postCartHandler,
  deleteCartHandler,
  };