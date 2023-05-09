const { DataTypes, INTEGER, UUID } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Room",
    {
        id:{
            type: UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        number:{
            type: INTEGER,
            allowNull: false,
            unique: true,
        }
    },
    {
      timestamps: false,
    }
  );
};
