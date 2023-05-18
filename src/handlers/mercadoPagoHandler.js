const { MERCADOPAGO_KEY } = process.env;
//?mercado pago
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: MERCADOPAGO_KEY,
});
const mercadoPagoHandler = async (req, res) => {
  //? Objeto que se va a vender
  const { product } = req.body;
  let preference = {
    //?Propiedades de lo que se va a vender (vienen atraves de un body desde el front)
    items: {
      // id:
      // title: product.title
      //* id. title, currency_id, picture-url,description, categoryid, quantity, unit-price
    },
    back_urls: {
      //ADONDE SE REDIRIGE SEGUN QUE SUCEDE CON LA ACCION DE COMPRA
      success: "",
      failure: "",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true, //ESTO HACE QUE NO SE ACEPTEN PAGOS EN PENDIENTE
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
  //   res.status(200).send("Funciona");
};

response.init_point;
//!La propiedad "init_point" de response nos redirige al pago
module.exports = {
  mercadoPagoHandler,
};
