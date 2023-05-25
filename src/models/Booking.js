const { INTEGER,FLOAT,DATE, STRING } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Booking",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      amount:{
        type: INTEGER,
        allowNull: false,
        validate: {
            min: 1
          },
      },
      price:{
        type: FLOAT(2),
        allowNull: false,
      },
      date: {
        type: DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      checkIn: {
        type: STRING,
        allowNull: false,
      },
      checkOut: {
        type: STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
