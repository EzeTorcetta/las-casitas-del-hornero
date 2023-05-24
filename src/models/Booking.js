const { INTEGER,FLOAT,DATE } = require("sequelize");

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
      
    },
    {
      timestamps: false,
    }
  );
};
