'use strict';
const { Model } = require('sequelize');
const db = require("./index");

module.exports = (sequelize, DataTypes) => {
  class User extends Model { }

  User.init({
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize: db,
    modelName: 'User',
    underscored: true,
    timestamps: false,
    tableName: 'users',
  });
  return User;
};
