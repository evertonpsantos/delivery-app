'use strict';
const { Model } = require('sequelize');
const db = require('./index');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model { }
  Product.init({
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    urlImage: DataTypes.STRING
  }, {
    sequelize: db,
    modelName: 'Product',
    underscored: true,
    timestamps: false,
    tableName: 'products',
  });
  return Product;
};
