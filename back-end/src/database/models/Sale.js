'use strict';

module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {type: DataTypes.INTEGER, allowNull: false },
    sellerId: {type: DataTypes.INTEGER, allowNull: false },
    totalPrice: {type: DataTypes.DECIMAL(9, 2), allowNull: false },
    deliveryAddress:{type: DataTypes.STRING, allowNull: false },
    deliveryNumber: {type: DataTypes.STRING, allowNull: false },
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING }
  }, {
    modelName: 'Sale',
    underscored: true,
    timestamps: false,
    tableName: 'sales',
  });

  sale.associate = (models) => {
    sale.belongsTo(models.SalesProducts, { foreignKey: 'id', as: 'sale' });
    sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller' });
  }

  return sale;

};
