'use strict';

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    urlImage: DataTypes.STRING
  }, {
    modelName: 'Product',
    underscored: true,
    timestamps: false,
    tableName: 'products',
  });

  return product;
};
