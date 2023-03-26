import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    await queryInterface.createTable('topics', {
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
      level: {
        type: dataTypes.INTEGER
      },
      endDate: {
        type: dataTypes.DATE
      },
      result: {
        type: dataTypes.INTEGER
      },
      num_person: {
        type: dataTypes.INTEGER
      },
      total_time: {
        type: dataTypes.INTEGER
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
    await queryInterface.dropTable('topics');
  }
};