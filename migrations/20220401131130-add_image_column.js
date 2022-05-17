'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn("mobil", "image", {type: Sequelize.STRING})
    //  menabahkan kolom baru dengan nama "image" bertipe "string" di tabel "mobil"
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("mobil", "image")
    // menghapus kolom "image" pada tabel "mobil"
  }
};
