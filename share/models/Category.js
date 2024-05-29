const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Category = database.define('Category', {
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

module.exports = Category;