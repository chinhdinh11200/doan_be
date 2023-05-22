import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const tableInfo = await queryInterface.describeTable('educations');
    if (!tableInfo.num_person) {
      await queryInterface.addColumn('educations', 'num_person', {
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
    
    const tableInfo = await queryInterface.describeTable('educations');
    if (tableInfo.num_person) {
      await queryInterface.removeColumn('educations', 'num_person');
    }
  }
};
