'use strict';

module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    sellerId: { type: DataTypes.INTEGER, allowNull: false },
    totalPrice: { type: DataTypes.INTEGER, allowNull: false },
    deliveryAddress: { type: DataTypes.STRING, allowNull: false },
    deliveryNumber: { type: DataTypes.STRING, allowNull: false },
    saleDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  }, {
    modelName: 'Sale',
    underscored: true,
    timestamps: false,
    tableName: 'sales',
  });

  sale.associate = (models) => {
    sale.belongsTo(models.SalesProducts, { foreignKey: 'id', as: 'sale' });
    sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  }

  return sale;

};
