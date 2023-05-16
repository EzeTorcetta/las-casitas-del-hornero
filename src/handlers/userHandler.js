const {
  getUser,
  postUser,
  getAllUsers,
  putRolUser,
} = require("../controllers/userControllers");

//* Handler que verifica en la DB si existe el User
const getUserHandler = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await getUser(password, email);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que trae a todos los Users de la DB

const getAllUsersHandler = async (req, res) => {
  const { id_user } = req.params;
  try {
    const allUsers = await getAllUsers(id_user);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea el user en la DB
const postUserHandler = async (req, res) => {
  const { username, password, email, admin } = req.body;
  try {
    await postUser({ username, password, email, admin });
    res.status(200).json("Usuario posteado con exito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putRolUserHandler = async (req, res) => {
  const { id_user, rol } = req.body; //ID DEL USUARIO QUE LE VAMOS A CAMBIAR EL ROL

  try {
    putUser = await putRolUser(id_user, rol);
    res.status(200).json(putUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getUserHandler,
  postUserHandler,
  getAllUsersHandler,
  putRolUserHandler,
};
