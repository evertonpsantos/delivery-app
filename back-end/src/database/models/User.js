'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    modelName: 'User',
    underscored: true,
    timestamps: false,
    tableName: 'users',
  });

  user.associate = (models) => {
    user.hasMany(models.Sale, {
      foreignKey: 'userId',
      as: 'user'
    })

    user.hasMany(models.Sale, {
      foreignKey: 'sellerId',
      as: 'seller'
    })
  };

  return user;
};
