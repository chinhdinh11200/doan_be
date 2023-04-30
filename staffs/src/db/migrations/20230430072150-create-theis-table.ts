import { DataTypes, QueryInterface, literal } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('thesis', {
      id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      name_student: {
        type: dataTypes.STRING,
      },
      course: {
        type: dataTypes.STRING,
      },
      num_decision: {
        type: dataTypes.STRING,
      },
      type: {
        type: dataTypes.INTEGER,
      },
      num_person: {
        type: dataTypes.INTEGER,
      },
      num_year: {
        type: dataTypes.INTEGER,
      },
      total_time: {
        type: dataTypes.INTEGER,
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
    return await queryInterface.dropTable('thesis');
  },
};
