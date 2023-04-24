import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('exams', 'marking', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('exams', 'exam_create', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('exams', 'exam_supervision', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('exams', 'number_quizzes', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('exams', 'num_student', {
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
    await queryInterface.removeColumn('exams', 'marking');
    await queryInterface.removeColumn('exams', 'exam_create');
    await queryInterface.removeColumn('exams', 'exam_supervision');
    await queryInterface.removeColumn('exams', 'number_quizzes');
    await queryInterface.removeColumn('exams', 'num_student');
  }
};
