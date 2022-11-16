const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Aluno = require('./Aluno');

const Curso = database.define('Curso', {
  // Model attributes are defined here
  nomecurso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duracaocurso: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  datapublicacao: {
    type: DataTypes.DATE
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

Curso.associate = function(models) {
  Curso.hasMany(models.Aluno);
}

// `sequelize.define` also returns the model
//console.log(Curso === database.models.Curso); // true 
module.exports = Curso;