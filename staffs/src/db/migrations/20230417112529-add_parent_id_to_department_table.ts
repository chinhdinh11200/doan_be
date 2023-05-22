import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const tableInfo = await queryInterface.describeTable('departments');
    if (!tableInfo.parent_id) {
      await queryInterface.addColumn('departments', 'parent_id', {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const tableInfo = await queryInterface.describeTable('departments');
    if (tableInfo.parent_id) {
      await queryInterface.removeColumn('departments', 'parent_id');
    }
  }
};
