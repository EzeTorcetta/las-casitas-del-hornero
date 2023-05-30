require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  DB_DEPLOY,
  { logging: false, native: false }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: hotel => Hotel
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const { Request, Hotel, Room, RoomType, Service, User, Review, Booking, Cart } =
  sequelize.models;


User.hasMany(Request);
Request.belongsTo(User);

User.hasMany(Hotel);
Hotel.belongsTo(User);

Hotel.hasMany(RoomType);
RoomType.belongsTo(Hotel);

RoomType.hasMany(Room);
Room.belongsTo(RoomType);

Hotel.hasMany(Room);
Room.belongsTo(Hotel);

Hotel.belongsToMany(Service, { through: "HotelServices" });
Service.belongsToMany(Hotel, { through: "HotelServices" });

Hotel.hasMany(Review);
Review.belongsTo(Hotel);

const Favorites = sequelize.define("Favorites");

Hotel.belongsToMany(User, { through: Favorites });
User.belongsToMany(Hotel, { through: Favorites });

User.hasMany(Booking);
Booking.belongsTo(User);

RoomType.hasMany(Booking);
Booking.belongsTo(RoomType);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

Cart.belongsTo(User);
Cart.belongsTo(RoomType);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
