//?----------------------------IMPORTS--------------------------------
const { Hotel, User, Service } = require("../db");

//?----------------------------CONTROLLERS------------------------------

//*------------GET ALL HOTELS-------------------
const getAllHotels = async () => {
  const allHotels = await Hotel.findAll({
    include: {
      model: Service,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  if (!allHotels.length) {
    throw new Error("Hotel not found");
  } else {
    return allHotels;
  }
};

//*------------GET HOTEL DETAIL-------------------
const getDetailHotel = async (id) => {
  const hotel = await Hotel.findOne({
    where: { id },

    include: {
      model: Service,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  if (hotel) {
    return hotel;
  } else {
    throw new Error("Hotel not found");
  }
};
//*------------CREATE HOTEL-------------------
const createHotel = async (
  {
    name,
    email,
    phoneNumber,
    image,
    province,
    location,
    rating,
    description,
    services,
  },
  id
) => {
  userFind = await User.findOne({
    where: {
      id,
      admin: true,
    },
  });

  if (!userFind) throw new Error("User not found or User is not Admin");
  

  const newHotel = await Hotel.create({
    name,
    email,
    phoneNumber,
    image,
    province,
    location,
    rating,
    description,
  });

  await newHotel.addServices(services);
  await userFind.addHotel(newHotel);

  return newHotel;
};

module.exports = {
  getAllHotels,
  getDetailHotel,
  createHotel,
};
