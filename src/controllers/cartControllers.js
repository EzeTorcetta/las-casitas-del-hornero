//?----------------------------IMPORTS--------------------------------

const { User, RoomType, Cart } = require("../db");

//?----------------------------CONTROLLERS------------------------------

//*------------ GET CART OF USER -------------------
const getCart = async (id_user) => {
  const cart = await Cart.findAll({
    where: { UserId: id_user },
  });

  const roomsPromises = cart.map(async (saved) => {
    const room = await RoomType.findByPk(saved.RoomTypeId);
    return room;
  });

  const rooms = await Promise.all(roomsPromises);

  if(rooms.length) return rooms;
  else throw new Error("Cart is empty")
  
};

//*------------ ADD CART  -------------------

const postCart = async (id_user, id_roomtype) => {
  const user = await User.findByPk(id_user);
  const room = await RoomType.findByPk(id_roomtype);
  await room.addUser(user);
  return;
};

//*------------ DELETE CART -------------------

const deteleCart = async (id_user, id_roomtype) => {
  const room = await RoomType.findByPk(id_roomtype);
  await room.removeUser(id_user);
  return;
};

module.exports = {
    getCart,
    postCart,
    deteleCart,
};