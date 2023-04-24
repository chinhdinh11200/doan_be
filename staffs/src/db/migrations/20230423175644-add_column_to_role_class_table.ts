import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('classes', 'marking', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('classes', 'exam_create', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('classes', 'exam_supervision', {
      type: dt.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('classes', 'marking');
    await queryInterface.removeColumn('classes', 'exam_create');
    await queryInterface.removeColumn('classes', 'exam_supervision');
  }
};
