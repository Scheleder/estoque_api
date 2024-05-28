const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Item = require('../models/Item')
const User = require('../models/User')

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
  
  Movement.belongsTo(Item, { constraint:true, foreignKey: 'itemId' })
  Movement.belongsTo(User, { constraint:true, foreignKey: 'userId' })

  module.exports = Movement;