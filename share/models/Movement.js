const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Item = require('../models/Item')
const User = require('../models/User')
const Local = require('../models/Local')

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
localId: {
    type: DataTypes.INTEGER,
    allowNull: true
},
  }, {
    timestamps: true,
    paranoid: true
  });
  
  Movement.belongsTo(Item, { constraint:true, foreignKey: 'itemId' })
  Movement.belongsTo(User, { constraint:true, foreignKey: 'userId' })
  Movement.belongsTo(Local, { constraint:true, foreignKey: 'localId' })
  Item.hasMany(Movement, { foreignKey: 'itemId' });
  User.hasMany(Movement, { foreignKey: 'userId' });
  Local.hasMany(Movement, { foreignKey: 'localId' });

  module.exports = Movement;