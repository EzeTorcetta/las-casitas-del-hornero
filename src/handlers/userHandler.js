const { getUser, postUser } = require("../controllers/userControllers");

//* Handler que verifica en la DB si existe el User
const getUserHandler = async (req, res) => {
  const data = req.body;
  try {
    const user = getUser(data);
    console.log("Verificado con exito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea el user en la DB
const postUserHandler = async (req, res) => {
  const data = req.body;
  try {
    await postUser(data);
    console.log("Usuario posteado");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserHandler,
  postUserHandler,
};
