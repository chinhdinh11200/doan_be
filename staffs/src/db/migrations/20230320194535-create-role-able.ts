import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    await queryInterface.createTable('role_ables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED
      },
      role_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      role_able_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      type: {
        type: dataTypes.INTEGER
      },
      time: {
        type: dataTypes.STRING
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
    await queryInterface.dropTable('role_ables');
  }
};