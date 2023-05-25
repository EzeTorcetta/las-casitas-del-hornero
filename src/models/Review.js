const { INTEGER, UUID, UUIDV4, TEXT, STRING, DATE } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      review: {
        type: TEXT,
        allowNull: false,
      },
      punctuation: {
        type: INTEGER,
        allowNull: false,
      },

      username: {
        type: STRING,
        allowNull: false,
      },
      date: {
        type: DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      image: {
        type: STRING,
      }
    },
    {
      timestamps: false,
    }
  );
};
