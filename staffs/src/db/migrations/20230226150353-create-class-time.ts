import { DataTypes, QueryInterface, literal } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('class_times', {
      id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      class_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      time_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: null,
      },
    });
  },

  down: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeConstraint('classes', 'class_times_ibfk_1');
    // await queryInterface.removeConstraint('times', 'class_times_ibfk_2');
    return await queryInterface.dropTable('class_times');
  },
};
