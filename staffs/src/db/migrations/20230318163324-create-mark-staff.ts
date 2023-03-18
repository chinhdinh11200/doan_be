import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    return await queryInterface.createTable('mark_user', {
      user_id: {
        allowNull: false,
        type: dataTypes.BIGINT.UNSIGNED,
        references: {model: 'users', key: 'id'}
      },
      mark_id: {
        allowNull: true,
        type: dataTypes.BIGINT.UNSIGNED,
        references: { model: 'marks', key: 'id' }
      },
    });
  },
  down: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    return await queryInterface.dropTable('mark_user');
  }
};