//?----------------------------IMPORTS--------------------------------

const { User } = require("../db");
const { Op } = require("sequelize");
//?----------------------------CONTROLLERS------------------------------

//*-----------------GET USER---------------------
const getUser = async (password, email) => {
  if (!password) {
    throw new Error("No password");
  } else if (!email) {
    throw new Error("No mail");
  } else {
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      throw new Error("User not exist");
    } else {
      const findUser2 = await User.findOne({
        where: { password, email },
        attributes: ["id", "username", "email", "rol"],
      });
      if (!findUser2) {
        throw new Error("Missing password");
      }

      return findUser2;
    }
  }
};

//*---------------CREATE USER---------------------

const postUser = async ({ username, password, email, admin }) => {
  if (!username || !password || !email) {
    throw new Error("Faltan datos");
  } else {
    const findUserByUsername = await User.findOne({ where: { username } });
    const findUserByEmail = await User.findOne({ where: { email } });

    if (findUserByUsername) {
      throw new Error("Existing username");
    } else if (findUserByEmail) {
      throw new Error("Existing email");
    } else {
      await User.create({
        username,
        password,
        email,
        rol: 1,
      });
      return;
    }
  }
};

//*---------------GET ALL USERS---------------------
const getAllUsers = async (id_user) => {
  const findUser = await User.findOne({ where: { id: id_user } });

  if (findUser.rol == 3) {
    findAllUsers = await User.findAll({
      where: {
        id: {
          [Op.not]: id_user,
        },
      },
      attributes: ["id", "username", "email", "rol"],
    });
  } else {
    throw new Error("Permission denied, you are not an administrator");
  }

  return findAllUsers;
};

//*---------------PUT ROL USER---------------------
const putRolUser = async (id_user, rol) => {
  const findUser = await User.findByPk(id_user);

  if (findUser) {
    findUser.rol = rol;

    await findUser.save();
  } else {
    throw new Error("User does not exist");
  }

  return findUser;
};

//*-----------------GET ALL USERS---------------------
module.exports = {
  getUser,
  postUser,
  getAllUsers,
  putRolUser,
};
