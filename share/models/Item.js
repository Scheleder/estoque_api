const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const User = database.define('Item', {
    // Model attributes are defined here
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.0000,
    },
    minimum: {
        type: DataTypes.DECIMAL,
        defaultValue: 0.0000,
    },
    adress: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    brandId: {
        type: DataTypes.INTEGER,
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
  
  Item.hasMany(Movement, { as: 'movements', foreignKey: 'itemId' });
  Item.hasOne(Brand, { as: 'brand', foreignKey: 'brandId' });
  // `sequelize.define` also returns the model
  //console.log(Curso === database.models.Curso); // true 
  module.exports = Item;