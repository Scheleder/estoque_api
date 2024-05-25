const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const User = database.define('Movement', {
    // Model attributes are defined here
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL
        // allowNull defaults to true
    },
    destination: {
            type: DataTypes.STRING
            // allowNull defaults to true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
        // allowNull defaults to true
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    itemId: {
        type: DataTypes.INTEGER,
    },
  }, {
        // Other model options go here
  });
  
  Movement.belongsTo(User, { foreignKey: 'userId' });
  Movement.belongsTo(Item, { foreignKey: 'itemId' });
  // `sequelize.define` also returns the model
  //console.log(Curso === database.models.Curso); // true 
  module.exports = Movement;