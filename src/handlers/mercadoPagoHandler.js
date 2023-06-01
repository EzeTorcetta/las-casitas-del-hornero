const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const mercadoPagoHandler = async (req, res) => {
  const  product  = req.body;


  let preference = {
    items: [],
    back_urls: {
      success: "https://casitas-del-hornero-8mam7k5m2-maximustxt.vercel.app/Home",
      failure: "https://casitas-del-hornero-8mam7k5m2-maximustxt.vercel.app/Home",
      pending: "/pending",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  product?.forEach((item) => {
    preference.items.push({
      id: item.id,                      //* id_roomType
      title: `Reserva de ${item.name} en ${item.hotelname}`,   
      currency_id: "ARS",        //*
      quantity: item.amount,
      unit_price: item.unit_price,     //* item.price  * (fechasX.length) ---> "fechasX" es la cantidad de dias 
    });
  });


  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({error: error.message}))
};
module.exports = {
  mercadoPagoHandler,
};
