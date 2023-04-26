import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn('exams', 'subject_id', {
    //   type: dt.BIGINT.UNSIGNED,
    //   allowNull: true,
    // });
    const tableInfo = await queryInterface.describeTable('exams');
    if (!tableInfo.factor) {
      await queryInterface.addColumn('exams', 'factor', {
        type: dt.INTEGER,
        allowNull: true,
      })
    }
    if (!tableInfo.subject_id) {
      await queryInterface.addColumn('exams', 'subject_id', {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      })
    }
    if (!tableInfo.num_question) {
      await queryInterface.addColumn('exams', 'num_question', {
        type: dt.INTEGER,
        allowNull: true,
      })
    }
    if (tableInfo.number_question) {
      await queryInterface.removeColumn('exams', 'number_question');
    }
    if (tableInfo.time_work) {
      await queryInterface.removeColumn('exams', 'time_work');
    }
    if (tableInfo.semester_id) {
      await queryInterface.removeColumn('exams', 'semester_id');
    }
    if (tableInfo.marking) {
      await queryInterface.removeColumn('exams', 'marking');
    }
    if (tableInfo.exam_create) {
      await queryInterface.removeColumn('exams', 'exam_create');
    }
    if (tableInfo.exam_supervision) {
      await queryInterface.removeColumn('exams', 'exam_supervision');
    }
    if (tableInfo.number_quizzes) {
      await queryInterface.removeColumn('exams', 'number_quizzes');
    }
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const tableInfo = await queryInterface.describeTable('exams');
    if (tableInfo.factor) {
      await queryInterface.removeColumn('exams', 'factor');
    }
    if (tableInfo.subject_id) {
      await queryInterface.removeColumn('exams', 'subject_id');
    }
  }
};
