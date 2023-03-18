import { QueryInterface, DataTypes, literal } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface: QueryInterface, dataTypes: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED
      },
      department_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: { model: 'departments', key: 'id' },
      },
      name: {
        allowNull: false,
        type: dataTypes.STRING
      },
      email: {
        allowNull: false,
        type: dataTypes.STRING
      },
      password: {
        allowNull: false,
        type: dataTypes.STRING
      },
      salt: {
        allowNull: true,
        type: dataTypes.STRING
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      position: {
        type: DataTypes.STRING,
      },
      number_salary: {
        type: DataTypes.FLOAT,
      },
      income: {
        type: DataTypes.FLOAT,
      },
      time_per_year: {
        type: DataTypes.FLOAT,
      },
      time_reserve: {
        type: DataTypes.FLOAT,
      },
      degree: {
        type: DataTypes.STRING,
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
    await queryInterface.removeConstraint('users', 'users_ibfk_1');
    return await queryInterface.dropTable('users');
  }
};
