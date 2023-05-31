import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const tableInfo = await queryInterface.describeTable('rooms');
    if (tableInfo.name) {
      await queryInterface.changeColumn('rooms', 'name', { type: dt.STRING, allowNull: true });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // const tableInfo = await queryInterface.describeTable('users');
    // if (tableInfo.avatar) {
    //   await queryInterface.removeColumn('users', 'avatar');
    // }
  }
};
