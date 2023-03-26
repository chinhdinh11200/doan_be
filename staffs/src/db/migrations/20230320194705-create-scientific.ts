import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    await queryInterface.createTable('scientifics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED
      },
      name: {
        type: dataTypes.STRING
      },
      code: {
        type: dataTypes.STRING
      },
      num_decision: {
        type: dataTypes.STRING
      },
      total_time: {
        type: dataTypes.INTEGER
      },
      result_level: {
        type: dataTypes.INTEGER
      },
      date_decision: {
        type: dataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: dataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: dataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: null,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('scientifics');
  }
};