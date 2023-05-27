const {
  getAllServices,
  createServices,
  deleteService,
} = require("../controllers/servicesControllers");

//* Handler que trae todos los servicios
const getAllServicesHandler = async (req, res) => {
  try {
    const allServices = await getAllServices();
    res.status(200).json(allServices);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que postea el service
const postServicesHandler = async (req, res) => {
  const { name } = req.body;

  try {
    await createServices({ name });
    res.status(200).json("Servicio creado con exito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//* Handler que borra el service
const deleteServicesHandler = async (req, res) => {
  const { id_service } = req.params;

  try {
    await deleteService(id_service);
    res.status(200).json("Servicio eliminado con exito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllServicesHandler,
  postServicesHandler,
  deleteServicesHandler,
};
