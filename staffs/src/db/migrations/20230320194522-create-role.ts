import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED,
      },
      name: {
        type: dataTypes.STRING
      },
      time: {
        type: dataTypes.STRING
      },
      type: {
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
    await queryInterface.dropTable('roles');
  }
};