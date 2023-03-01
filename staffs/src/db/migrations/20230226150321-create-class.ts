import { DataTypes, QueryInterface, literal } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('classes', {
      id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      subject_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'subjects',
          key: 'id',
        },
      },
      user_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      parent_id: {
        type: dataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      form_teach: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      num_student: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      classroom: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      startDate: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      endDate: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      level_teach: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      time_teach: {
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
    // await queryInterface.removeConstraint('users', 'classes_ibfk_2');
    // await queryInterface.removeConstraint('subjects', 'classes_ibfk_1');
    return await queryInterface.dropTable('classes');
  },
};
