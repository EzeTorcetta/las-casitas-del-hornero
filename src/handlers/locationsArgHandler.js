//?----------------------------IMPORTS-------------------------------

const {
  getAllProvinces,
  getMunicipalitiesById,
  getLocalitiesById,
} = require("../controllers/locationsArgControllers");

//?----------------------------HANDLERS-------------------------------

//*Handler que trae todas las provincias arg
const getLocationsHandler = (req, res) => {
  const { id_province, id_municipality } = req.query;

  if (id_province) getMunicipalitiesByIdHandler(id_province);
  if (id_municipality) getLocalitiesByIdHandler(id_municipality);
  getAllProvincesHandler();
};
const getAllProvincesHandler = async (req, res) => {
  try {
    const provinces = await getAllProvinces();
    res.status(200).json(provinces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*Handler que trae los municipios de una provincia especifica

const getMunicipalitiesByIdHandler = async (req, res, id_province) => {
  try {
    const municipalities = await getMunicipalitiesById(id_province);
    res.status(200).json(municipalities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*Handler que trae las localidades de un municipio específico

const getLocalitiesByIdHandler = async (req, res, id_municipality) => {
  try {
    const localities = await getLocalitiesById(id_municipality);
    res.status(200).json(localities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getLocationsHandler,
  // getAllProvincesHandler,
  // getMunicipalitiesByIdHandler,
  // getLocalitiesByIdHandler,
};
