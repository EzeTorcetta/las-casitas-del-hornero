const { INTEGER, ARRAY, DATE } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Room",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      number: {
        type: INTEGER,
        // autoIncrement: true,
      },
      dates: {
        type: ARRAY(DATE),
      }
    },
    {
      timestamps: false,
    }
  );
};
