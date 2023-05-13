//?----------------------------IMPORTS--------------------------------

const { User } = require("../db");

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
      const findUser2 = await User.findOne({ where: { password, email } });
      if (!findUser2) {
        throw new Error("Missing password");
      }

      return findUser2;
    }
  }
};

//*---------------CREATE USER---------------------

const postUser = async ({ username, password, email, admin }) => {
  if (!username || !password || !email || !(typeof admin === "boolean")) {
    throw new Error("Faltan datos");
  } else {
    const findUserByUsername = await User.findOne({ where: { username } });
    const findUserByEmail = await User.findOne({ where: { email } });
    console.log(findUserByUsername);
    if (findUserByUsername) {
      throw new Error("Existing username");
    } else if (findUserByEmail) {
      throw new Error("Existing email");
    } else {
      await User.create({
        username,
        password,
        email,
        admin,
      });
      return;
    }
  }
};

module.exports = {
  getUser,
  postUser,
};
