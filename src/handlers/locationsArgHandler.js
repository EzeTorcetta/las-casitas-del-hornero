//?----------------------------IMPORTS-------------------------------

const {
  getAllProvinces,
  getMunicipalitiesById,
  getLocalitiesById,
} = require("../controllers/locationsArgControllers");

//?----------------------------HANDLERS-------------------------------

//*Handler que trae todas las provincias arg

const getAllProvincesHandler = async (req, res) => {
  try {
    const provinces = await getAllProvinces();
    res.status(200).json(provinces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*Handler que trae los municipios de una provincia especifica

const getMunicipalitiesByIdHandler = async (req, res) => {
  try {
    const { id_province } = req.query;
    const municipalities = await getMunicipalitiesById(id_province);
    res.status(200).json(municipalities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*Handler que trae las localidades de un municipio específico

const getLocalitiesByIdHandler = async (req, res) => {
  try {
    const { id_municipality } = req.query;
    const localities = await getLocalitiesById(id_municipality);
    res.status(200).json(localities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {getLocalitiesByIdHandler,getMunicipalitiesByIdHandler,getAllProvincesHandler}
