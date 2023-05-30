const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const mercadoPagoHandler = async (req, res) => {
  const { product } = req.body;
  let preference = {
    items: 
     [
      // cada item del carrito es un objeto
      {
        title: "Reserva",
        currency_id: "ARS",          //* MONEDA
        description: "Una habitacion muy bonita",   
        quantity: 1,                //* CANTIDAD
        category_id:"travels",    //CATEGORIA    
        unit_price: 1000,       //* PRECIO POR UNIDAD
        picture_url: "http://www.myapp.com/myimage.jpg",
        
      },
      // {
      //   title: "Reserva",
      //   currency_id: "ARS",          //* MONEDA
      //   description: "Individual",    
      //   quantity: 3,          //* CANTIDAD
      //   unit_price: 500,  
      // }
    ],
    back_urls: {
      success: "https://www.facebook.com/",
      failure: "/failure",
      pending: "/pending",
    },
    auto_return: "approved",
    binary_mode: true,
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({error: error.message}))
};
module.exports = {
  mercadoPagoHandler,
};
