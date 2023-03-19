import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    return await queryInterface.createTable('exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED
      },
      user_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      name: {
        type: dataTypes.STRING
      },
      code: {
        type: dataTypes.STRING
      },
      form_exam: {
        type: dataTypes.STRING
      },
      number_question: {
        type: dataTypes.INTEGER
      },
      time_work: {
        type: dataTypes.INTEGER
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
        defaultValue: null
      },
    });
  },
  down: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    return await queryInterface.dropTable('exams');
  }
};