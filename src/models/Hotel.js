const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Hotel",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isPhoneNumber: function (value) {
            if (!/^[0-9()-\s]+$/.test(value)) {
              throw new Error(
                "El número de teléfono contiene caracteres no válidos"
              );
            }
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      valoration: {
        type: DataTypes.FLOAT,
        validate: {
          min: 1,
          max: 10,
        },
        allowNull: false,
      },
      province: {
        type: DataTypes.ENUM(
          "BUENOS AIRES",
          "CATAMARCA",
          "CHACO",
          "CHUBUT",
          "CORDOBA",
          "CORRIENTES",
          "ENTRE RIOS",
          "FORMOSA",
          "JUJUY",
          "LA PAMPA",
          "LA RIOJA",
          "MENDOZA",
          "MISIONES",
          "NEUQUEN",
          "RIO NEGRO",
          "SALTA",
          "SAN JUAN",
          "SAN LUIS",
          "SANTA CRUZ",
          "SANTA FE",
          "SANTIAGO DEL ESTERO",
          "TIERRA DEL FUEGO",
          "TUCUMAN"
        ),
        allowNull: false,
      },
      location: { type: DataTypes.ARRAY(DataTypes.DOUBLE), allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};
