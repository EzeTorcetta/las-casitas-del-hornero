const { Service } = require("../db");

//*-----------------GET Services---------------------
const getAllServices = async () => {
  const allServices = await Service.findAll();

  if (!allServices.length) {
    throw new Error("Services not found");
  } else {
    return allServices;
  }
};

//*-----------------POST Services---------------------
const createServices = async ({ name }) => {
  if (!name) throw new Error("You can't send an empty name");

  const service = await Service.findOne({ where: { name } });

  if (service) {
    throw new Error("Existing service");
  } else {
    await Service.create({
      name,
    });
    return;
  }
};

//*-----------------DELETE Services---------------------
const deleteService = async (id) => {
  const service = await Service.findByPk(id);

  if (!service) {
    throw new Error("Service does not exist");
  } else {
    await Service.destroy({ where: { id } });
    return;
  }
};

module.exports = { getAllServices, createServices, deleteService };
