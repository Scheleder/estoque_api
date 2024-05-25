const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const User = database.define('User', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    password: {
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
  
  User.hasMany(Movement, { as: 'movements', foreignKey: 'userId' });
  // `sequelize.define` also returns the model
  //console.log(Curso === database.models.Curso); // true 
  module.exports = User;