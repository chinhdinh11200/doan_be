import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('scientifics', 'num_person', {
      type: dt.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('scientifics', 'type', {
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

    const tableInfo = await queryInterface.describeTable('scientifics');
    if (tableInfo.type) {
      await queryInterface.removeColumn('scientifics', 'type');
    }
    if (tableInfo.num_person) {
      await queryInterface.removeColumn('scientifics', 'num_person');
    }
  }
};
