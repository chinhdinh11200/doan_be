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
    if (tableInfo.semester) {
      await queryInterface.renameColumn('rooms', 'semester', 'semester_id');
    }
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    
    const tableInfo = await queryInterface.describeTable('rooms');
    if (tableInfo.semester_id) {
      await queryInterface.renameColumn('rooms', 'semester_id', 'semester');
    }
  }
};
