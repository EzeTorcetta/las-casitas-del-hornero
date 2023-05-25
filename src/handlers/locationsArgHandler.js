//?----------------------------IMPORTS-------------------------------

const {
  getAllProvinces,
  getDepartmentsById,
  getLocalitiesById,
} = require("../controllers/locationsArgControllers");
const compareByname = require("../helpers/compareByName");
//?----------------------------HANDLERS-------------------------------

//*Handler que segun el query redirige a otros handlers
const getLocationsHandler = (req, res) => {
  const { id_province, id_department } = req.query;

  if (id_province) {
    getDepartmentsByIdHandler(req, res, id_province);
  } else if (id_department) {
    getLocalitiesByIdHandler(req, res, id_department);
  } else getAllProvincesHandler(req, res);
};

//*Handler que trae todas las provincias arg

const getAllProvincesHandler = async (req, res) => {
  try {
    const provincesDisorder = await getAllProvinces();
    const provinces = provincesDisorder.sort(compareByname);
    res.status(200).json(provinces); //arreglo ordenado
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*Handler que trae los departamentos de una provincia especifica

const getDepartmentsByIdHandler = async (req, res, id_province) => {
  try {
    // const { id_province } = req.query;
    const departamentsDisorder = await getDepartmentsById(id_province);
    const departments = departamentsDisorder.sort(compareByname);
    res.status(200).json(departments); //arreglo ordenado
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*Handler que trae las localidades de un departamento específico

const getLocalitiesByIdHandler = async (req, res, id_department) => {
  try {
    // const { id_department } = req.query;
    const localitiesDisorder = await getLocalitiesById(id_department);
    const localities = localitiesDisorder.sort(compareByname);
    res.status(200).json(localities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getLocationsHandler,
};
