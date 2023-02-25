import { QueryInterface, DataTypes, literal } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await queryInterface.createTable('departments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED
      }, 
      name: {
        allowNull: false,
        type: dataTypes.STRING
      },
      code: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: null
      },
    })
  },

  down: async (queryInterface: QueryInterface, datatypes: typeof DataTypes) => {
    await queryInterface.dropTable('departments');
  }
};
