//?----------------------------IMPORTS--------------------------------

const { default: axios } = require("axios");

//?----------------------------CONTROLLERS------------------------------

//*----------------- GET ALL PROVINCES---------------------

const getAllProvinces = async () => {
  const { data } = await axios.get(
    `https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre`
  );
  const provinces = data.provincias; //es arreglo de {id y nombre}

  if (!provinces.length) {
    throw new Error("Provinces not found");
  } else {
    return provinces;
  }
};

//*----------------- GET DEPARTA BY PROVINCE_ID ---------------------

const getDepartmentsById = async (province_id) => {
  const { data } = await axios.get(
    `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${province_id}&campos=id,nombre&max=100`
  );
  const departments = data.departamentos; // es arreglo de {id y nombre}
  if (!departments.length) {
    throw new Error(`Departments of Province with id ${province_id} not found`);
  } else {
    return departments;
  }
};

//*----------------- GET LOCALITIES BY DEPARTMENT_ID---------------------

const getLocalitiesById = async (id_department) => {
  const { data } = await axios.get(
    `https://apis.datos.gob.ar/georef/api/localidades?departamento=${id_department}&campos=id,nombre&max=100`
  );
  const localities = data.localidades;

  if (!localities.length) {
    throw new Error(
      `Localities of Departent with id ${id_department} not found`
    );
  } else {
    return localities;
  }
};

//? Estos controladores se podrían hacer tambien segun si viene la query o no en los anteriores, pero no sabia muy de que manera hacerlo. Funcionarían para el detail, para mostrar los nombres. Tambien se podria evitar guardando en la base de datos directamente los nombres y NO los id de cada provincia, departamento y localidad.

//!Controladores en el caso de que guardemos los id en la base de datos
// const getProvinceById = async (id_province) => {
//   const { data } = await axios.get(
//     `https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&id=${id_province}`
//   );
//   const province = data.provincias[0]; // objeto con id y nombre
// };
// const getDepartmentById = async (id_department) => {
//   const { data } = await axios.get(
//     `https://apis.datos.gob.ar/georef/api/departamentos?campos=id,nombre&id=${id_department}`
//   );
//   const department = data.departamentos[0]; //objeto con id y nombre
// };

// const getLocalityById = async (locality_id) => {
//   const { data } = await axios.get(
//     `https://apis.datos.gob.ar/georef/api/localidades?campos=id,nombre&id=${id_locality}`
//   );
//   const locality = data.localidades[0];
//   return locality; // objeto con id y nombre
// };

module.exports = {
  getAllProvinces,
  getLocalitiesById,
  getDepartmentsById,
};
