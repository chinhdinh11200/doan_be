import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('rooms', 'exam_id', 'subject_id');
    // const tableInfo = await queryInterface.describeTable('rooms');
    // if (tableInfo.semester_id) {
      await queryInterface.removeColumn('rooms', 'semester_id');
    // }
    await queryInterface.addColumn('rooms', 'user_id', {
      type: dt.BIGINT.UNSIGNED,
      allowNull: true,
    });
    await queryInterface.addColumn('rooms', 'time', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('rooms', 'type', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('rooms', 'factor', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('rooms', 'num_exam_session', {
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
    await queryInterface.renameColumn('rooms', 'subject_id', 'exam_id');
    await queryInterface.removeColumn('rooms', 'user_id');
    await queryInterface.removeColumn('rooms', 'time');
    await queryInterface.removeColumn('rooms', 'type');
    await queryInterface.removeColumn('rooms', 'factor');
    await queryInterface.removeColumn('rooms', 'num_exam_session');
  }
};
