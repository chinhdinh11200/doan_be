import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, dt: typeof DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const classesTableInfo = await queryInterface.describeTable('classes');
    const examTableInfo = await queryInterface.describeTable('exams');
    const roomTableInfo = await queryInterface.describeTable('rooms');
    const markTableInfo = await queryInterface.describeTable('marks');
    const thesiTableInfo = await queryInterface.describeTable('thesis');
    const topicTableInfo = await queryInterface.describeTable('topics');
    const articleTableInfo = await queryInterface.describeTable('articles');
    const bookTableInfo = await queryInterface.describeTable('books');
    const compilationTableInfo = await queryInterface.describeTable('compilations');
    const inventionTableInfo = await queryInterface.describeTable('inventions');
    const educationTableInfo = await queryInterface.describeTable('educations');
    const scientificTableInfo = await queryInterface.describeTable('scientifics');

    if (!classesTableInfo.year_id) {
      await queryInterface.addColumn('classes', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!examTableInfo.year_id) {
      await queryInterface.addColumn('exams', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!roomTableInfo.year_id) {
      await queryInterface.addColumn('rooms', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!markTableInfo.year_id) {
      await queryInterface.addColumn('marks', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!thesiTableInfo.year_id) {
      await queryInterface.addColumn('thesis', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!topicTableInfo.year_id) {
      await queryInterface.addColumn('topics', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!articleTableInfo.year_id) {
      await queryInterface.addColumn('articles', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!bookTableInfo.year_id) {
      await queryInterface.addColumn('books', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!compilationTableInfo.year_id) {
      await queryInterface.addColumn('compilations', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!educationTableInfo.year_id) {
      await queryInterface.addColumn('educations', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!inventionTableInfo.year_id) {
      await queryInterface.addColumn('inventions', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }

    if (!scientificTableInfo.year_id) {
      await queryInterface.addColumn('scientifics', 'year_id', {
        type: dt.INTEGER,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    const classesTableInfo = await queryInterface.describeTable('classes');
    if (classesTableInfo.year_id) {
      await queryInterface.removeColumn('classes', 'year_id');
    }
    const examTableInfo = await queryInterface.describeTable('exams');
    if (examTableInfo.year_id) {
      await queryInterface.removeColumn('exams', 'year_id');
    }
    const roomTableInfo = await queryInterface.describeTable('rooms');
    if (roomTableInfo.year_id) {
      await queryInterface.removeColumn('rooms', 'year_id');
    }
    const markTableInfo = await queryInterface.describeTable('marks');
    if (markTableInfo.year_id) {
      await queryInterface.removeColumn('marks', 'year_id');
    }
    const thesiTableInfo = await queryInterface.describeTable('thesis');
    if (thesiTableInfo.year_id) {
      await queryInterface.removeColumn('thesis', 'year_id');
    }
    const topicTableInfo = await queryInterface.describeTable('topics');
    if (topicTableInfo.year_id) {
      await queryInterface.removeColumn('topics', 'year_id');
    }
    const articleTableInfo = await queryInterface.describeTable('articles');
    if (articleTableInfo.year_id) {
      await queryInterface.removeColumn('articles', 'year_id');
    }
    const bookTableInfo = await queryInterface.describeTable('books');
    if (bookTableInfo.year_id) {
      await queryInterface.removeColumn('books', 'year_id');
    }
    const compilationTableInfo = await queryInterface.describeTable('compilations');
    if (compilationTableInfo.year_id) {
      await queryInterface.removeColumn('compilations', 'year_id');
    }
    const inventionTableInfo = await queryInterface.describeTable('inventions');
    if (inventionTableInfo.year_id) {
      await queryInterface.removeColumn('inventions', 'year_id');
    }
    const educationTableInfo = await queryInterface.describeTable('educations');
    if (educationTableInfo.year_id) {
      await queryInterface.removeColumn('educations', 'year_id');
    }
    const scientificTableInfo = await queryInterface.describeTable('scientifics');
    if (scientificTableInfo.year_id) {
      await queryInterface.removeColumn('scientifics', 'year_id');
    }
  }
};
