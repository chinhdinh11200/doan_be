import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('years', 'semester', {
      type: dt.INTEGER,
      allowNull: true,
    });
    const tableInfo = await queryInterface.describeTable('years');
    if (tableInfo.start_date) {
      await queryInterface.changeColumn('years', 'start_date', {
        type: dt.DATE,
        allowNull: true,
      })
      await queryInterface.renameColumn('years', 'start_date', 'startDate');
    }
    if (tableInfo.end_date) {
      await queryInterface.changeColumn('years', 'end_date', {
        type: dt.DATE,
        allowNull: true,
      })
      await queryInterface.renameColumn('years', 'end_date', 'endDate');
    }
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    const tableInfo = await queryInterface.describeTable('years');
    if (tableInfo.semester) {
      await queryInterface.removeColumn('years', 'semester');
    }
  }
};
