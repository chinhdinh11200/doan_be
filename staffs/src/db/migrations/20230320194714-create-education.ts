import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    await queryInterface.createTable('educations', {
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
      num_credit: {
        type: dataTypes.INTEGER
      },
      total_time: {
        type: dataTypes.INTEGER
      },
      form_construction: {
        type: dataTypes.INTEGER
      },
      num_decision: {
        type: dataTypes.STRING
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
    await queryInterface.dropTable('educations');
  }
};