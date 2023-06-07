import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const tableInfoBook = await queryInterface.describeTable('books');
    if (tableInfoBook.num_publish) {
      await queryInterface.changeColumn('books', 'num_publish', { type: dt.STRING, allowNull: true });
    }

    const tableInfoArticle = await queryInterface.describeTable('articles');
    if (tableInfoArticle.index_article) {
      await queryInterface.changeColumn('articles', 'index_article', { type: dt.STRING, allowNull: true });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // const tableInfo = await queryInterface.describeTable('users');
    // if (tableInfo.avatar) {
    //   await queryInterface.removeColumn('users', 'avatar');
    // }
  }
};
