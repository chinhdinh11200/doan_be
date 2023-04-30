import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('articles', 'open_access', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('articles', 'open_access_scopus', {
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

    const tableInfo = await queryInterface.describeTable('articles');
    if (tableInfo.open_access_scopus) {
      await queryInterface.removeColumn('articles', 'open_access_scopus');
    }
    if (tableInfo.open_access) {
      await queryInterface.removeColumn('articles', 'open_access');
    }
  }
};
