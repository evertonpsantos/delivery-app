'use strict';

module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('SalesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER
  }, {
    modelName: 'SalesProducts',
    underscored: true,
    timestamps: false,
    tableName: 'sales_products',
  });

  salesProducts.associate = (models) => {
    salesProducts.belongsToMany(models.Sale, { 
      as: 'sale', 
      through: salesProducts,  
      foreignKey: 'saleId',
      otherKey: 'productId'
    });

    salesProducts.belongsToMany(models.Product, { 
      as: 'product',
      through: salesProducts,  
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
  }


  return salesProducts;
};
