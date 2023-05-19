const { INTEGER, UUIDV4, UUID } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      amount: {
        type: INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
    }
  );
};
