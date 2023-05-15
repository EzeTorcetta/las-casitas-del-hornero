const { DataTypes, INTEGER, UUID } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Check",
    {
      id: {
        type: UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      checkIn:{
        type: INTEGER,
        allowNull: false,
      },
      checkOut:{
        type: INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
