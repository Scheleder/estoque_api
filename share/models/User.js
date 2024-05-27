const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Movement = require('../models/Movement')

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
    }
}, {
  timestamps: true,
});

User.Movements = User.hasMany(Movement, { foreignKey: 'userId' });

module.exports = User;