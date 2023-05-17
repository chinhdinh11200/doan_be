import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('marks', 'semester', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('exams', 'semester', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('exams', 'num_exam', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('rooms', 'semester', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('classes', 'form_exam', {
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

    const tableInfo = await queryInterface.describeTable('marks');
    if (tableInfo.semester) {
      await queryInterface.removeColumn('marks', 'semester');
    }
    const tableRoomInfo = await queryInterface.describeTable('rooms');
    if (tableRoomInfo.semester) {
      await queryInterface.removeColumn('rooms', 'semester');
    }
    const tableExamInfo = await queryInterface.describeTable('exams');
    if (tableExamInfo.semester) {
      await queryInterface.removeColumn('exams', 'semester');
    }
    if (tableExamInfo.num_exam) {
      await queryInterface.removeColumn('exams', 'num_exam');
    }
    const tableClassInfo = await queryInterface.describeTable('classes');
    if (tableClassInfo.form_exam) {
      await queryInterface.removeColumn('classes', 'form_exam');
    }
    if (tableInfo.num_person) {
      await queryInterface.removeColumn('scientifics', 'num_person');
    }
  }
};
