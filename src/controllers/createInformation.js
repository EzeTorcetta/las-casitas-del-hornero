const { User, Hotel } = require("../db");

const createInformation = async () => {
  user = [];

  user.push({
    username: "Juan Martin",
    password: "contrasenia",
    email: "juanmartin@gmail.com",
    admin: true,
  });

  user.push({
    username: "Jose",
    password: "contrasenia",
    email: "jose@gmail.com",
    admin: false,
  });

  user.push({
    username: "Eze",
    password: "contraseña",
    email: "eze@gmail.com",
    admin: false,
  });

  user.push({
    username: "Manuel",
    password: "contrasenia",
    email: "manuel@gmail.com",
    admin: true,
  });

  User.bulkCreate(user);
  const hoteles = [];

  hoteles.push({
    name: "MustafaHotel",
    email: "mustafahotel@gmail.com",
    phoneNumber: "01134531",
    province: "BUENOS AIRES",
    location: [1200, -1200],
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
  });

  hoteles.push({
    name: "MarioHotel",
    email: "MarioHotel@gmail.com",
    phoneNumber: "0264454531",
    province: "SAN JUAN",
    location: [300, -300],
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
  });

  Hotel.bulkCreate(hoteles);

  const usuario = await User.findOne({ where: { username: "Juan Martin" } });
  const hotel1 = await Hotel.findByPk(1);
  const hotel2 = await Hotel.findByPk(2);

  // console.log(usuario)
  // console.log(hotel1)

  usuario.addHotel(hotel1);
  usuario.addHotel(hotel2);

  const mostrar = await Hotel.findOne({ where: { province: "SAN JUAN" } });
};

module.exports = createInformation;
