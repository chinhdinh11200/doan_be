import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    return await queryInterface.createTable('class_exam', {
      exam_id: {
        allowNull: false,
        type: dataTypes.BIGINT.UNSIGNED,
        references: {model: 'exams', key: 'id'}
      },
      class_id: {
        allowNull: true,
        type: dataTypes.BIGINT.UNSIGNED,
        references: { model: 'classes', key: 'id' }
      },
    });
  },
  down: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    return await queryInterface.dropTable('class_exam');
  }
};