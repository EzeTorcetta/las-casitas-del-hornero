//?----------------------------IMPORTS----------------------------------
const { Hotel, User, Service } = require("../db");
const { Op } = require("sequelize");

//?----------------------------CONTROLLERS------------------------------

//*------------GET ALL HOTELS -------------------
const getAllHotels = async () => {
  const allHotels = await Hotel.findAll({
    include:{
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      }
  });

  return allHotels;
}

//*------------GET ALL HOTELS QUERY-------------------
const getAllHotelsQuery = async (servicio, provincia, rating) => {
  const whereClause = {};

  if (provincia) {
    const provinces = [];
    if (!(typeof provincia === 'string'))provincia.map((pro)=>{ provinces.push(pro) });
    else provinces.push(provincia)

    whereClause.province = {
      [Op.in]: provinces,
    };  
  }

  if (rating) {
    rating = Number(rating)
    whereClause.rating = {
      [Op.eq]: rating,
    };
  }

  const allHotels = await Hotel.findAll({
    where: whereClause,
    include:{
        model: Service,
        attributes: ["name"],
        required: true,
        through: {
          attributes: [],
        },
      }
  });

  let hoteles = allHotels;

  if(servicio){
    const services= [];
    if (!(typeof servicio === 'string'))servicio.map((ser)=>{ services.push(ser) });
    else services.push(servicio)

    hoteles = allHotels.filter(hotel => {
      return services.every(servicio => hotel.dataValues.Services.some(s => s.dataValues.name === servicio));
    });
  }
  
  if (hoteles) {
    return hoteles;
  } else {
    throw new Error("No hotels found");
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
  getAllHotelsQuery
};
