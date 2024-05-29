const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Local = database.define('Local', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  timestamps: true,
  paranoid: true
});  

module.exports = Local;