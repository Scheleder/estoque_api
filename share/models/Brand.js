const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Brand = database.define('Brand', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: {
    type: DataTypes.STRING
  },
  logo: {
    type: DataTypes.STRING
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
  

module.exports = Brand;