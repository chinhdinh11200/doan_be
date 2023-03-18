import { DataTypes, QueryInterface, literal } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('rooms', {
      id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      exam_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'exams',
          key: 'id',
        },
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      num_student: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      endDate: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      semester: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        allowNull: true,
        type: dataTypes.DATE,
        defaultValue: null
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
    return await queryInterface.dropTable('rooms');
  },
};
