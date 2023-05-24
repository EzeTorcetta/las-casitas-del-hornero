const { UUIDV4, INTEGER, UUID } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Room",
    {
        id:{
            type: UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        number:{
            type: INTEGER,
            allowNull: false,
        }
    },
    {
      timestamps: false,
    }
  );
};
