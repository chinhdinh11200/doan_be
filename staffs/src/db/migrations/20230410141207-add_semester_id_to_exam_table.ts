import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn('exams', 'semester_id', {
    //   type: dt.INTEGER,
    //   allowNull: true,
    // });
    await queryInterface.addColumn('exams', 'subject_id', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('exams', 'num_code', {
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
    // await queryInterface.removeColumn('exams', 'semester_id');
    const tableInfo = await queryInterface.describeTable('exams');
    if (tableInfo.subject_id) {
      await queryInterface.removeColumn('exams', 'subject_id');
    }
    if (tableInfo.num_code) {
      await queryInterface.removeColumn('exams', 'num_code');
    }
  }
};
