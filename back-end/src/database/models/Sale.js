'use strict';
const { Model } = require('sequelize');
const db = require('./index');
const User = require('./User');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model { }

  Sale.init({
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize: db,
    modelName: 'Sale',
    underscored: true,
    timestamps: false,
    tableName: 'sales',
  });

  Sale.belongsTo(User, { foreignKey: 'userId', as: 'userId' });
  Sale.belongsTo(User, { foreignKey: 'sellerId', as: 'sellerId' });

  return Sale;

};
