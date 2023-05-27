const { INTEGER, STRING,BOOLEAN } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: STRING,
        allowNull: false,
      },
      password: {
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
      rol: {
        type: INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 3,
        },
      },
      image: {
        type: STRING,
        allowNull: true,
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      timestamps: false,
    }
  );
};
