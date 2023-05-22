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
    if (!tableInfo.type_role) {
      await queryInterface.addColumn('role_user', 'type_role', {
        type: dt.INTEGER,
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
    const tableInfo = await queryInterface.describeTable('role_user');
    if (tableInfo.type_role) {
      await queryInterface.removeColumn('role_user', 'type_role');
    }
  }
};
