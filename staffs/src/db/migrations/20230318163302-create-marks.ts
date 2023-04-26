import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    return await queryInterface.createTable('marks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED
      },
      subject_id: {
        allowNull: true,
        type: dataTypes.BIGINT.UNSIGNED,
      },
      time_mark: {
        type: dataTypes.INTEGER
      },
      form_mark: {
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
        defaultValue: null
      },
    });
  },
  down: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    return await queryInterface.dropTable('marks');
  }
};