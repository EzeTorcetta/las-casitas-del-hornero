const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const mercadoPagoHandler = async (req, res) => {
  const { product } = req.body;
  let preferences = {
    items: [
      // cada item del carrito es un objeto
      {
        title: "Ejemplo de reserva de hospedaje",
        currency_id: "ARS",
        description: "Descripcion de hospedaje",
        quantity: 1,
        unit_price: 10,
      },
    ],
    back_urls: {
      success: "/http://localhost:3001",
      failure: "/failure",
      pending: "/pending",
    },
    auto_return: "approved",
    binary_mode: true,
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch(error)
    .send({ error: error.message });
};
module.exports = {
  mercadoPagoHandler,
};
