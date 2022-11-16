const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Curso = require('./curso');

const Aluno = database.define('Aluno', {
  // Model attributes are defined here
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  bairro: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  telefone: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  cep: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  dtnascimento: {
    type: DataTypes.DATE
    // allowNull defaults to true
  }
}, {
  // Other model options go here

});

Aluno.associate = function(models) {
  Aluno.belongsTo(models.Curso);
}

// `sequelize.define` also returns the model
//console.log(Aluno === database.models.Aluno); // true 
module.exports = Aluno;

