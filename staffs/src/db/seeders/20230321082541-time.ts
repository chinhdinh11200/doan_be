import { QueryInterface } from 'sequelize';
import * as crypto from 'crypto';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('times', [
      {
        name: '1 -> 3',
      },
      {
        name: '4 -> 6',
      },
      {
        name: '7 -> 9',
      },
      {
        name: '10 -> 12',
      },
      {
        name: '13 -> 16',
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('times', {}, {});
  }
};
