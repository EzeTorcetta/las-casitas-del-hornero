const {
  getAllHotels,
  getDetailHotel,
  createHotel,
} = require("../controllers/hotelControllers");

//* Handler que trae todos los hoteles de la DB
const getAllHotelsHandler = async (req, res) => {
  try {
    const allHotels = await getAllHotels();
    res.status(200).json(allHotels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que trae el hotel especifico de la DB
const getDetailHotelHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const detailHotel = await getDetailHotel(id);
    res.status(200).json(detailHotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea el hotel en la DB
const postHotelHandler = async (req, res) => {
  const { id_user } = req.query;
  const {
    name,
    email,
    phoneNumber,
    image,
    province,
    description,
    rating,
    location,
    services,
  } = req.body;
  try {
    if (id_user) {
      {
        const newHotel = await createHotel(
          {
            name,
            email,
            description,
            rating,
            phoneNumber,
            image,
            province,
            location,
            services,
          },
          id_user
        );
        res.status(200).json(newHotel);
      }
    } else {
      throw new Error("No se proporcionó un ID de usuario válido");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllHotelsHandler,
  getDetailHotelHandler,
  postHotelHandler,
};
