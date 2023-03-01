import { QueryInterface, DataTypes, literal } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('tokens', { id: Sequelize.INTEGER });
     */

    return await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED
      }, 
      email: {
        type: dataTypes.STRING,
      },
      token: {
        type: dataTypes.STRING
      },
      createdAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('tokens');
     */
    // await queryInterface.removeConstraint('tokens', 'tokens_ibfk_1');
    return await queryInterface.dropTable('tokens');
  }
};
