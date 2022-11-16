'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cursos', [{
      nomecurso: 'Matemática',
      duracaocurso: '60 dias',
      datapublicacao: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cursos', null, {});
  }
};
