"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    static associate(models) {
      books.belongsTo(models.categories, {
        as: "category",
        foreignKey: {
          name: "categoryId",
        },
      });
      books.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  books.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      publication: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      page: DataTypes.INTEGER,
      isbn: DataTypes.STRING,
      about: DataTypes.STRING,
      file: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return books;
};
