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
    var salt = crypto.randomBytes(16).toString('hex');
    var password: string = crypto
      .createHmac('sha256', salt)
      .update("admin")
      .digest('hex');

    return await queryInterface.bulkInsert('users', [{
      department_id: 1,
      name: 'Admin',
      email: 'admin@gmail.com',
      password: password,
      salt: salt,
      code: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete('users', {}, {});
  }
};
