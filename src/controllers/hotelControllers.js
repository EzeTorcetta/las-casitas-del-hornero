//?----------------------------IMPORTS----------------------------------
const { Hotel, User, Service, Review, RoomType, Room } = require("../db");
const { Op } = require("sequelize");
const moment = require('moment');

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
      attributes: ["id", "username", "punctuation", "review", "date", "image"],
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
  name,
  checkIn,
  checkOut
) => {


const formattedCheckIn = moment(checkIn, 'YYYY-MM-DD').toDate();
const formattedCheckOut = moment(checkOut, 'YYYY-MM-DD').toDate();

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
          model: RoomType

        },
        {
          model: Review,
          attributes: [
            "id",
            "username",
            "punctuation",
            "review",
            "date",
            "image",
          ],
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
          model: RoomType

        },
        {
          model: Review,
          attributes: [
            "id",
            "username",
            "punctuation",
            "review",
            "date",
            "image",
          ],
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
          model: RoomType

        },
        {
          model: Review,
          attributes: [
            "id",
            "username",
            "punctuation",
            "review",
            "date",
            "image",
          ],
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
          model: RoomType

        },
        {
          model: Review,
          attributes: [
            "id",
            "username",
            "punctuation",
            "review",
            "date",
            "image",
          ],
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
          model: RoomType

        },
        {
          model: Review,
          attributes: [
            "id",
            "username",
            "punctuation",
            "review",
            "date",
            "image",
          ],
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
          model: RoomType

        },
        {
          model: Review,
          attributes: [
            "id",
            "username",
            "punctuation",
            "review",
            "date",
            "image",
          ],
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
          model: RoomType,
          includes: {
            model: Room
          }

        },

        {
          model: Review,
          attributes: [
            "id",
            "username",
            "punctuation",
            "review",
            "date",
            "image",
          ],
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

 
  //* Traigo los Id de los hoteles que pasaron los filtros
  const hotelsId = hoteles.map((hotel) => hotel.id)

  
  //* Traigo todas las rooms que pertenezcan a esos hoteles

  const rooms = await Room.findAll({
    where: {
      HotelId: {
        [Op.in]: hotelsId
      },
    }
  });

  checkIn = new Date(checkIn);
  checkOut = new Date(checkOut);


  //* Se filtran las rooms que estan disponibles en las fechas de CheckIn y CheckOut

  const roomsAvailable = rooms.filter((room)=>{
    let bool = false;
    if(room.dates.length){
      for (let i=0;i<room.dates.length; i++){
        if(room.dates[i] < checkIn && room.dates[i+1] > checkOut){
          bool = true
        }
        if(checkOut<room.dates[0]){bool=true; console.log(true)};
        if(checkIn>room.dates[room.dates.length-1]){bool=true;console.log(true)}
      }
    }
    else bool = true;
    return bool;
  })

  const hotelsId2 = roomsAvailable.map((room) => room.HotelId)
  
  const hotelsAvailables = await Hotel.findAll({where:{
    id: {
      [Op.in]: hotelsId2
    },
  }})


  //* Paginado------------------------------
  const limit = 5;
  const count = hotelsAvailables.length;
  const numPages = Math.ceil(count / limit);

  allHotels = hotelsAvailables.slice((page - 1) * limit, (page - 1) * limit + limit);

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
        attributes: [
          "id",
          "username",
          "punctuation",
          "review",
          "date",
          "image",
        ],
      },
    ],
  });

  if (!hotels.length) {
    throw new Error("El usuario no posee hoteles");
  }

  return hotels;
};

//*------------GET HOTEL DETAIL-------------------

const getDetailHotel = async (id) => {
  const hotel = await Hotel.findOne({
    where: { id },

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
        attributes: ["id", "people", "price", "name", "image"],
      },
      {
        model: Review,
        attributes: [
          "id",
          "username",
          "punctuation",
          "review",
          "date",
          "image",
        ],
      },
    ],
  });

  if (hotel) {
    return hotel;
  } else {
    throw new Error("Hotel no encontrado");
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

  if (!userFind) throw new Error("Usuario no encontrado o no eres administrador");

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
