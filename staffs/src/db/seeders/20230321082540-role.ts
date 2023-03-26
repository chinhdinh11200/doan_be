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
    return await queryInterface.bulkInsert('roles', [
      {
        name: 'Đề tài dự án',
        type: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bài báo ấn phẩm khoa học',
        type: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bằng sáng chế, giải thưởng khoa học',
        type: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sách giáo trình xuất bản trong nước được Hội đồng Chức danh Giáo sư nhà nước tính điểm',
        type: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hướng dẫn sinh viên nghiên cứu khoa học và huấn luyện đội tuyển',
        type: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xây dựng chương trình đào tạo',
        type: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Biên soạn giáo trình bài giảng phục vụ đào tạo tại Học viện',
        type: 7,
        createdAt: new Date(),
        updatedAt: new Date()
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

    return await queryInterface.bulkDelete('roles', {}, {});
  }
};
