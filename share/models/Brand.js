const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const User = database.define('Brand', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    site: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
      // allowNull defaults to true
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
      // allowNull defaults to true
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
    // Other model options go here
  });
  
  Brand.hasMany(Item, { as: 'items', foreignKey: 'brandId' });
  // `sequelize.define` also returns the model
  //console.log(Curso === database.models.Curso); // true 
  module.exports = Brand;