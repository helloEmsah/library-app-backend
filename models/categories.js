"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    static associate(models) {
      categories.hasMany(models.books, {
        as: "book",
        foreignKey: {
          name: "categoryId",
        },
      });
    }
  }
  categories.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "categories",
    }
  );
  return categories;
};
