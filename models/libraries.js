"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class libraries extends Model {
    static associate(models) {
      libraries.belongsTo(models.books, {
        as: "book",
        foreignKey: {
          name: "bookId",
        },
      });

      libraries.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  libraries.init(
    {
      bookId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "libraries",
    }
  );
  return libraries;
};
