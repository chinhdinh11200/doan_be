import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    const tableInfo = await queryInterface.describeTable('role_user');
    if (tableInfo.role_id) {
      await queryInterface.renameColumn('role_user', 'role_id', 'role_able_id');
    }
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const tableInfo = await queryInterface.describeTable('role_user');
    if (tableInfo.role_able_id) {
      await queryInterface.renameColumn('role_user', 'role_able_id', 'role_id');
    }
  }
};
