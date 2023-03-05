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
    price: { type: DataTypes.DECIMAL(3, 2), allowNull: false },
    urlImage: { type: DataTypes.STRING, allowNull: false, field: 'url_image' },
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
