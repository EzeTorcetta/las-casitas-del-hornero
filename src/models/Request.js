const { INTEGER, TEXT, DATE, STRING, BOOLEAN } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Request",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      message: {
        type: TEXT,
        allowNull: true,
      },
      username: {
        type: STRING,
        allowNull: false
      },
      email: {
        type: STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      date: {
        type: DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      timestamps: false,
    }
  );
};
