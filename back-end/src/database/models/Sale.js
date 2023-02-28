'use strict';

module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
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
    modelName: 'Sale',
    underscored: true,
    timestamps: false,
    tableName: 'sales',
  });

  sale.associate = (models) => {
    sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  }

  return sale;

};
