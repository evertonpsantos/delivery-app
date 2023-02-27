'use strict';
const { Model } = require('sequelize');
const db = require('./index');
const Sale = require('./Sale');
const Product = require('./Products');

module.exports = (sequelize, DataTypes) => {
  class SalesProducts extends Model { }
  SalesProducts.init({
    saleId: DataTypes.INTEGER, // fg e pk
    productId: DataTypes.INTEGER, // fg e pk
    quantity: DataTypes.INTEGER
  }, {
    sequelize: db,
    modelName: 'SalesProducts',
    underscored: true,
    timestamps: false,
    tableName: 'sales_products',
  });

  SalesProducts.belongsToMany(Sale, { foreignKey: 'saleId', as: 'sale_id' });
  SalesProducts.belongsToMany(Product, { foreignKey: 'productId', as: 'product_id' });

  return SalesProducts;
};
