'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('alunos', [{
      nome: 'John Doe',
      dtnascimento: new Date('1972-02-15'),
      telefone: '(41) 991 248 571',
      bairro: 'Roça Grande',
      cep: '83.402-370'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunos', null, {});
  }
};
