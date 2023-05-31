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
        defaultValue: ["2023-05-24", "2023-05-25", "2023-05-26", "2023-05-29"]
      }
    },
    {
      timestamps: false,
    }
  );
};
