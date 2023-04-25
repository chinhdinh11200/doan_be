import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('exams', 'factor', { type: dt.FLOAT, allowNull: true });
    await queryInterface.changeColumn('rooms', 'factor', { type: dt.FLOAT, allowNull: true });
    await queryInterface.changeColumn('marks', 'factor', { type: dt.FLOAT, allowNull: true });
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.renameColumn('role_user', 'role_able_id', 'role_id');
  }
};
