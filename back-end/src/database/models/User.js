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
      foreignKey: 'user_id',
      as: 'user'
    })

    user.hasMany(models.Sale, {
      foreignKey: 'seller_id',
      as: 'seller'
    })
  };

  return user;
};
