const { STRING, INTEGER, FLOAT, TEXT, ARRAY, DOUBLE } = require("sequelize");

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
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: STRING,
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
        type: INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      description: {
        type: TEXT,
        allowNull: true,
      },
      image: {
        type: ARRAY(STRING),
        allowNull: false,
      },
      valoration: {
        type: FLOAT(2),
        validate: {
          min: 1,
          max: 10,
        },
        allowNull: false,
      },
      province: {
        type: STRING,
        allowNull: false,
      },
      department: {
        type: STRING,
        allowNull: false,
      },
      locality: {
        type: STRING,
        allowNull: false,
      },
      location: { type: ARRAY(DOUBLE), allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};
