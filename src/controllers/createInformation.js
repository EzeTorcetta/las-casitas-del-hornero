const { User, Hotel, RoomType, Service } = require("../db");

const CreateService = () => {
  const services = [];

  services.push({
    name: "Desayuno gratis",
  });
  services.push({
    name: "Pileta",
  });
  services.push({
    name: "Hotel frente a la playa",
  });
  services.push({
    name: "Wi-Fi",
  });
  services.push({
    name: "Estacionamiento",
  });
  services.push({
    name: "Aire acondicionado",
  });
  services.push({
    name: "Restaurante",
  });
  services.push({
    name: "Mascotas permitidas",
  });
  services.push({
    name: "Familias",
  });
  services.push({
    name: "Bañera de hidromasaje",
  });
  services.push({
    name: "Spa",
  });
  services.push({
    name: "Gimnasio",
  });
  services.push({
    name: "Acceso silla de ruedas",
  });
  services.push({
    name: "Ascensor",
  });

  Service.bulkCreate(services);
};

const CreateUsers = () => {
  const user = [];

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
};

const CreateHotels = async () => {
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

  hoteles.push({
    name: "FabricioHotel",
    email: "fabriciohotel@gmail.com",
    phoneNumber: "0467897123",
    province: "RIO NEGRO",
    location: [-2340, -3892],
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
  });

  Hotel.bulkCreate(hoteles);

  const usuario = await User.findOne({ where: { username: "Juan Martin" } });
  const hotel1 = await Hotel.findByPk(1);
  const hotel2 = await Hotel.findByPk(2);
  await usuario.addHotel(hotel1);
  await usuario.addHotel(hotel2);

  // "Desayuno gratis"  "Pileta"  "Hotel frente a la playa"  "Aire acondicionado"  "Bañera de hidromasaje"  "Gimnasio"  "Acceso silla de ruedas"  "Ascensor" "Restaurante" "Mascotas permitidas"

  const s1 = await Service.findByPk(1);
  const s2 = await Service.findByPk(2);
  const s3 = await Service.findByPk(3);
  const s4 = await Service.findByPk(6);
  const s5 = await Service.findByPk(12);

  const serviceHotel1 = [s1, s2, s3, s4, s5];
  await hotel1.addService(serviceHotel1);

  const s6 = await Service.findByPk(1);
  const s7 = await Service.findByPk(2);
  const s8 = await Service.findByPk(3);
  const s9 = await Service.findByPk(8);
  const s10 = await Service.findByPk(13);
  const s11 = await Service.findByPk(6);
  const s12 = await Service.findByPk(7);

  const serviceHotel2 = [s6, s7, s8, s9, s10, s11, s12];
  await hotel2.addService(serviceHotel2);

  const usuario2 = await User.findOne({ where: { username: "Manuel" } });
  const hotel3 = await Hotel.findByPk(3);
  await usuario2.addHotel(hotel3);

  const s13 = await Service.findByPk(10);
  const s14 = await Service.findByPk(4);
  const s15 = await Service.findByPk(3);
  const s16 = await Service.findByPk(5);
  const s17 = await Service.findByPk(13);
  const s18 = await Service.findByPk(6);

  const serviceHotel3 = [s13, s14, s15, s16, s17, s18];
  await hotel3.addService(serviceHotel3);
};

const CreateRoomTypes = async () => {
  let roomType = [];

  //MustafaHotel
  roomType.push({
    people: 1,
    price: 1450.3,
    name: "Individual",
  });

  roomType.push({
    people: 3,
    price: 2600.6,
    name: "Familiar",
  });

  roomType.push({
    people: 4,
    price: 10000,
    name: "Suite",
  });

  //MarioHotel
  roomType.push({
    people: 1,
    price: 640.3,
    name: "Individual",
  });

  roomType.push({
    people: 3,
    price: 1500.6,
    name: "Familiar",
  });

  //FabricioHotel
  roomType.push({
    people: 1,
    price: 1400.3,
    name: "Individual",
  });

  roomType.push({
    people: 3,
    price: 3700.6,
    name: "Familiar",
  });

  roomType.push({
    people: 4,
    price: 15000,
    name: "Suite",
  });

  RoomType.bulkCreate(roomType);

  const Hotel1 = await Hotel.findOne({ where: { name: "MustafaHotel" } });
  const Room1 = await RoomType.findOne({ where: { name: "Individual" } });
  const Room2 = await RoomType.findOne({ where: { name: "Familiar" } });
  const Room3 = await RoomType.findOne({ where: { name: "Suite" } });

  await Hotel1.addRoomType(Room1);
  await Hotel1.addRoomType(Room2);
  await Hotel1.addRoomType(Room3);

  const Hotel2 = await Hotel.findOne({ where: { name: "MarioHotel" } });
  const Room4 = await RoomType.findOne({ where: { name: "Individual" } });
  const Room5 = await RoomType.findOne({ where: { name: "Familiar" } });

  await Hotel2.addRoomType(Room4);
  await Hotel2.addRoomType(Room5);

  const Hotel3 = await Hotel.findOne({ where: { name: "FabricioHotel" } });
  const Room6 = await RoomType.findOne({ where: { name: "Individual" } });
  const Room7 = await RoomType.findOne({ where: { name: "Familiar" } });
  const Room8 = await RoomType.findOne({ where: { name: "Suite" } });

  await Hotel3.addRoomType(Room6);
  await Hotel3.addRoomType(Room7);
  await Hotel3.addRoomType(Room8);

  // const mostrar = await RoomType.findAll({
  //     where:{ HotelId: 1 },
  //     include:{
  //         model: Hotel,
  //     }});
  // console.log(mostrar);
};

const createInformation = async () => {
  await CreateService();
  await CreateUsers();
  await CreateHotels();
  await CreateRoomTypes();
};

module.exports = createInformation;