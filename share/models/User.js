const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const User = database.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
}, {
  timestamps: true,
  paranoid: true
});

module.exports = User;