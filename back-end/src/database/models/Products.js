'use strict';

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    urlImage: { type: DataTypes.STRING, allowNull: false },
    }, {
    modelName: 'Product',
    timestamps: false,
    underscored: true,
    tableName: 'products',
  });

  product.associate = (models) => {
    product.belongsTo(models.SalesProducts, { foreignKey: 'id', as: 'product' });
  }

  return product;
};
