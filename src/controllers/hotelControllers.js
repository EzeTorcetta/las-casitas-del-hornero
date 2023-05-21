//?----------------------------IMPORTS----------------------------------
const { Hotel, User, Service, Review, RoomType } = require("../db");
const { Op } = require("sequelize");

//?----------------------------CONTROLLERS------------------------------

//*------------GET ALL HOTELS -------------------

const getAllHotels = async (order, page) => {
  let allHotels;

  let includeOptions = [
    {
      model: Service,
      attributes: ["name"],
      required: true,
      through: {
        attributes: [],
      },
    },
    {
      model: Review,
      attributes: ["id", "username", "punctuation", "review"],
    },
  ];

  const getOrderOptions = (order) => {
    switch (order) {
      case "RATINGASC":
        return [["rating", "ASC"]];
      case "RATINGDESC":
        return [["rating", "DESC"]];
      case "NAMEASC":
        return [["name", "ASC"]];
      case "NAMEDESC":
        return [["name", "DESC"]];
      case "VALORATIONASC":
        return [["valoration", "ASC"]];
      case "VALORATIONDESC":
        return [["valoration", "DESC"]];
      default:
        return null;
    }
  };

  const orderOptions = getOrderOptions(order);

  if (orderOptions) {
    allHotels = await Hotel.findAll({
      order: orderOptions,
      include: includeOptions,
    });
  } else {
    allHotels = await Hotel.findAll({
      include: includeOptions,
    });
  }

  const limit = 5;
  const count = allHotels.length;
  const numPages = Math.ceil(count / limit);

  allHotels = allHotels.slice((page - 1) * limit, (page - 1) * limit + limit);

  return { allHotels, numPages };
};

//*------------GET ALL HOTELS QUERY-------------------

const getAllHotelsQuery = async (
  servicio,
  province,
  locality,
  department,
  rating,
  order,
  page,
  name
) => {
  const whereClause = {};

  if (province) {
    whereClause.province = {
      [Op.iLike]: `%${province}`,
    };

    if (department) {
      whereClause.department = {
        [Op.iLike]: `%${department}`,
      };

      if (locality) {
        whereClause.locality = {
          [Op.iLike]: `%${locality}`,
        };
      }
    }
  }

  if (rating) {
    rating = Number(rating);
    whereClause.rating = {
      [Op.eq]: rating,
    };
  }

  if (name) {
    whereClause.name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  let allHotels;

  if (order === "NAMEASC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["name", "ASC"]],
      include: [
        {
          model: Service,
          attributes: ["name"],
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["id", "username", "punctuation", "review"],
        },
      ],
    });
  } else if (order === "NAMEDESC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["name", "DESC"]],
      include: [
        {
          model: Service,
          attributes: ["name"],
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["id", "username", "punctuation", "review"],
        },
      ],
    });
  } else if (order === "RATINGASC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["rating", "ASC"]],
      include: [
        {
          model: Service,
          attributes: ["name"],
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["id", "username", "punctuation", "review"],
        },
      ],
    });
  } else if (order === "RATINGDESC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["rating", "DESC"]],
      include: [
        {
          model: Service,
          attributes: ["name"],
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["id", "username", "punctuation", "review"],
        },
      ],
    });
  } else if (order === "VALORATIONASC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["valoration", "ASC"]],
      include: [
        {
          model: Service,
          attributes: ["name"],
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["id", "username", "punctuation", "review"],
        },
      ],
    });
  } else if (order === "VALORATIONDESC") {
    allHotels = await Hotel.findAll({
      where: whereClause,
      order: [["valoration", "DESC"]],
      include: [
        {
          model: Service,
          attributes: ["name"],
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["id", "username", "punctuation", "review"],
        },
      ],
    });
  } else {
    allHotels = await Hotel.findAll({
      where: whereClause,
      include: [
        {
          model: Service,
          attributes: ["name"],
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          attributes: ["id", "username", "punctuation", "review"],
        },
      ],
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

  const limit = 5;
  const count = hoteles.length;
  const numPages = Math.ceil(count / limit);

  allHotels = hoteles.slice((page - 1) * limit, (page - 1) * limit + limit);

  return { allHotels, numPages };
};

//*------------GET USER HOTELS -------------------

const getUserHotels = async (id_user) => {
  const hotels = await Hotel.findAll({
    where: {
      UserId: id_user,
    },
    include: [
      {
        model: Service,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: RoomType,
        attributes: ["id", "people", "price", "name", "image", "stock"],
      },
      {
        model: Review,
        attributes: ["id", "username", "punctuation", "review"],
      },
    ],
  });

  if (!hotels.length) {
    throw new Error("The user does not have a hotel");
  }

  return hotels;
};

//*------------CREATE HOTEL-------------------

const createHotel = async (
  {
    name,
    email,
    phoneNumber,
    image,
    province,
    department,
    locality,
    location,
    rating,
    description,
    services,
    valoration,
  },
  id
) => {
  userFind = await User.findOne({
    where: {
      id,
      rol: 2,
    },
  });

  if (!userFind) throw new Error("User not found or User is not Admin");

  const newHotel = await Hotel.create({
    name,
    email,
    phoneNumber,
    image,
    province,
    department,
    locality,
    location,
    rating,
    description,
    valoration,
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
  getUserHotels,
};
