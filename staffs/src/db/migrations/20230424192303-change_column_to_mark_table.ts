import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('marks', 'exam_id', 'subject_id');
    
    const tableInfo = await queryInterface.describeTable('marks');
    if (tableInfo.semester_id) {
      await queryInterface.removeColumn('marks', 'semester_id');
    }
    if (tableInfo.time_mark) {
      await queryInterface.removeColumn('marks', 'time_mark');
    }
    await queryInterface.addColumn('marks', 'user_id', {
      type: dt.BIGINT.UNSIGNED,
      allowNull: true,
    });
    await queryInterface.addColumn('marks', 'type', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('marks', 'factor', {
      type: dt.INTEGER,
      allowNull: true,
    }); 
    await queryInterface.addColumn('marks', 'num_exam', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('marks', 'date_exam', {
      type: dt.DATE,
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
    await queryInterface.removeColumn('marks', 'user_id');
    await queryInterface.removeColumn('marks', 'type');
    await queryInterface.removeColumn('marks', 'factor');
    await queryInterface.removeColumn('marks', 'num_exam');
    await queryInterface.removeColumn('marks', 'date_exam');
  }
};
