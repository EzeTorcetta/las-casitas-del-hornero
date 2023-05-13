//?----------------------------IMPORTS----------------------------------
const { Hotel, User, Service } = require("../db");
const { Op } = require("sequelize");

//?----------------------------CONTROLLERS------------------------------

//*------------GET ALL HOTELS -------------------
const getAllHotels = async (order) => {
  let allHotels;
  if (order === "RATINGASC") {
    allHotels = await Hotel.findAll({
      order: [["rating", "ASC"]],
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  } else if (order === "RATINGDESC") {
    allHotels = await Hotel.findAll({
      order: [["rating", "DESC"]],
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  } else if (order === "NAMEASC") {
    allHotels = await Hotel.findAll({
      order: [["name", "ASC"]],
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  } else if (order === "NAMEDESC") {
    allHotels = await Hotel.findAll({
      order: [["name", "DESC"]],
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  } else {
    allHotels = await Hotel.findAll({
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  }

  return allHotels;
};

//*------------GET ALL HOTELS QUERY-------------------
const getAllHotelsQuery = async (servicio, provincia, rating, order) => {
  const whereClause = {};

  if (provincia) {
    const provinces = [];
    if (!(typeof provincia === "string"))
      provincia.map((pro) => {
        provinces.push(pro);
      });
    else provinces.push(provincia);

    whereClause.province = {
      [Op.in]: provinces,
    };
  }

  if (rating) {
    rating = Number(rating);
    whereClause.rating = {
      [Op.eq]: rating,
    };
  }

  let allHotels;

  if (order === "NAMEASC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["name", "ASC"]],
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  } else if (order === "NAMEDESC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["name", "DESC"]],
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  } else if (order === "RATINGASC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["rating", "ASC"]],
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  } else if (order === "RATINGDESC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["rating", "DESC"]],
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  } else {
    allHotels = await Hotel.findAll({
      where: whereClause,
      include: {
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      },
    });
  }

  let hoteles = allHotels;

  if (servicio) {
    const services = [];
    if (!(typeof servicio === "string"))
      servicio.map((ser) => {
        services.push(ser);
      });
    else services.push(servicio);

    hoteles = allHotels.filter((hotel) => {
      return services.every((servicio) =>
        hotel.dataValues.Services.some((s) => s.dataValues.name === servicio)
      );
    });
  }

  return hoteles;

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
  getAllHotelsQuery,
};
