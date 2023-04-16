import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('topics', 'startDate', {
      type: dt.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('topics', 'acceptDate', {
      type: dt.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('topics', 'endDate', {
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
    await queryInterface.removeColumn('topics', 'startDate');
    await queryInterface.removeColumn('topics', 'acceptDate');
  }
};
