//?----------------------------IMPORTS--------------------------------

const { User, RoomType, Cart, Hotel } = require("../db");

//?----------------------------CONTROLLERS------------------------------

//*------------ GET CART OF USER -------------------
const getCart = async (id_user) => {
  const cart = await Cart.findAll({
    where: { UserId: id_user },
  });

  const carts = await Promise.all(
    cart.map(async (cart) => {
      const roomtype = await RoomType.findByPk(cart.RoomTypeId);
      const hotel = await Hotel.findByPk(roomtype.HotelId);

      const roomtypeWithAmount = {
        ...roomtype.toJSON(),
        amount: cart.amount,
        hotelName: hotel.name,
      };

      return roomtypeWithAmount;
    })
  );

  if (carts.length) return carts;
  else throw new Error("Cart is empty");
};

//*------------ ADD CART  -------------------

const postCart = async (id_user, id_roomtype) => {
  const user = await User.findByPk(id_user);

  const room = await RoomType.findByPk(id_roomtype);

  if (!user) {
    throw new Error("User not found");
  }
  if (!room) {
    throw new Error("Room not found");
  }


  const findCart = await Cart.findOne({
    where: {
      UserId: user.id,
      RoomTypeId: room.id,
    },
  });

  if (findCart) {
    throw new Error("Room already added!!");
  }
  const cart = await Cart.create({
    UserId: user.id,
    RoomTypeId: room.id,
  });
  return cart;

};

//*------------ DELETE ITEM OF CART -------------------


const deleteCart = async (id_user, id_roomtype) => {

  const user = await User.findByPk(id_user);
  const room = await RoomType.findByPk(id_roomtype);
  if (!room) {
    throw new Error("Room not found");
  }

  if (!user) {
    throw new Error("User not found");
  }

  await Cart.destroy({
    where: {
      UserId: user.id,
      RoomTypeId: room.id,
    },
  });

  return;
};

//*------------ DELETE ALL ITEMS OF CART -------------------

const deleteAllCart = async (id_user) => {
  await Cart.destroy({
    where: { UserId: id_user },
  });

  return;
};

const putAmountCart = async (id_user, id_roomtype, putAmount) => {
  const room = await Cart.findOne({
    where: {
      UserId: id_user,
      RoomTypeId: id_roomtype,
    },
  });
  if (!room) {
    throw new Error("Room not found");
  }

  if (putAmount === "up") {
    room.amount++;
    await room.save();
  }

  if (putAmount === "down" && room.amount > 1) {
    room.amount--;
    await room.save();
  }

  return room.amount;
};

module.exports = {
  getCart,
  postCart,
  deleteCart,
  deleteAllCart,
  putAmountCart,
};
