const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Movement = database.define('Movement', {
type: {
    type: DataTypes.STRING,
    allowNull: false
},
quantity: {
    type: DataTypes.DECIMAL(10, 4)
},
destination: {
    type: DataTypes.STRING
},
userId: {
    type: DataTypes.INTEGER,
    allowNull: true
},
itemId: {
    type: DataTypes.INTEGER,
    allowNull: true
},
  }, {
    timestamps: true,
  });
  

  module.exports = Movement;