const {
  getAllHotelsQuery,
  getAllHotels,
  getDetailHotel,
  createHotel,
  getUserHotels,
  putStatusHotel
} = require("../controllers/hotelControllers");

//* Handler que trae todos los hoteles de la DB
const getAllHotelsHandler = async (req, res) => {
  const {
    services,
    province,
    locality,
    department,
    rating,
    order,
    page,
    name,
    id_user,
    checkIn,
    checkOut
  } = req.query;

  try {
    let allHotels;
    services || province || rating || name
      ? (allHotels = await getAllHotelsQuery(
          services,
          province,
          locality,
          department,
          rating,
          order,
          page,
          name,
          checkIn,
          checkOut
        ))
      : id_user
      ? (allHotels = await getUserHotels(id_user))
      : (allHotels = await getAllHotels(order, page));
    if (allHotels.length || allHotels.allHotels?.length) {
      res.status(200).json(allHotels);
    } else
      res.status(400).json({ error: "No se encontró ningún hotel con los datos solicitados" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que trae el hotel especifico de la DB
const getDetailHotelHandler = async (req, res) => {
  const { id_hotel } = req.params;
 
  try {
    const detailHotel = await getDetailHotel(id_hotel,checkIn,checkOut);
    res.status(200).json(detailHotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea el hotel en la DB
const postHotelHandler = async (req, res) => {
  const { id_user } = req.params;
  const {
    name,
    email,
    phoneNumber,
    image,
    province,
    department,
    locality,
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
            department,
            locality,
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

const putStatusHotelHandler = async  (req,res) =>{
  const {id_hotel} = req.params
  
  try {
    await putStatusHotel(id_hotel)
    res.status(200).json("Estado cambiado")
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



module.exports = {
  getAllHotelsHandler,
  getDetailHotelHandler,
  postHotelHandler,
  putStatusHotelHandler
};
