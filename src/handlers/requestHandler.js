const { getRequest, postRequest, deleteRequest } = require("../controllers/requestControllers")

const getRequestHandler = async (req, res) => {

   const { id_user } = req.params
   try {
      const requests = await getRequest(id_user)
      res.status(200).json(requests)
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
};


const postRequestHandler = async (req, res) => {
   const { message, id_user } = req.body
   try {
      await postRequest(message, id_user)
      res.status(200).json("Peticiones enviada con exito")
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
};

const deleteRequestHandler = async (req, res) => {
   const { id_user } = req.params
   try {
      await deleteRequest(id_user)
      res.status(200).json("Peticiones borradas con exito!")
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
};

module.exports = {
   getRequestHandler,
   postRequestHandler,
   deleteRequestHandler

};
