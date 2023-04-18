import department from './../../models/department';
import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database')[env];
const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config);
const Department = department(sequelize, DataTypes)

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
    const [department, isCreated] = await Department.findOrCreate({
      where: {
        name: "Phòng Đào Tạo"
      },
      defaults: {
        name: "Phòng Đào Tạo",
        code: 'PDT',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await Department.findOrCreate({
      where: {
        name: "Khoa An Toàn Thông Tin"
      },
      defaults: {
        name: "Khoa An Toàn Thông Tin",
        code: 'ATTT',
        parent_id: department.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await Department.findOrCreate({
      where: {
        name: "Khoa Công Nghệ Thông Tin"
      },
      defaults: {
        name: "Khoa Công Nghệ Thông Tin",
        code: 'CNTT',
        parent_id: department.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await Department.findOrCreate({
      where: {
        name: "Khoa Điện Tử Viễn Thông"
      },
      defaults: {
        name: "Khoa Điện Tử Viễn Thông",
        code: 'DTVT',
        parent_id: department.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await Department.findOrCreate({
      where: {
        name: "Khoa Mật Mã"
      },
      defaults: {
        name: "Khoa Mật Mã",
        code: 'MM',
        parent_id: department.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('departments', {}, {});
  }
};
