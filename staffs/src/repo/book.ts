import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Book extends BaseRepository {
  private readonly model: DB['Book'];
  constructor(db: DB) {
    super(db);

    this.model = db.Book;
  }

  public search = async (params: types.book.BookSearchParam) => {
    // const a: = this.makeMultipleAmbiguousCondition(params, 'search', ['name', 'code']);
    const findOption: FindAndCountOptions = {
      include: [],
    };

    if (params !== undefined) {
      const andArray: WhereOptions[] = [];
      if (params.search !== undefined) {
        andArray.push(
          this.makeMultipleAmbiguousCondition(params, 'search', ['code', 'name'])
        );
      }
      findOption.where = {
        [Op.and]: andArray,
      };

      if (params.sort !== undefined) {
        if (`${params.sort}`.toLowerCase() === 'desc') {
          findOption.order = [
            [params.sortColumn ? params.sortColumn : 'createdAt', 'DESC']
          ];
        } else {
          findOption.order = [
            [params.sortColumn ? params.sortColumn : 'createdAt', 'ASC']
          ];
        }
      } else {
        findOption.order = [['createdAt', 'DESC']];
      }
    }


    const books = this.model.findAndCountAll(findOption);
    return books;
  };
  public create = async (params: types.book.BookCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const book = await this.model.create(
        {
          name: params.name,
          code: params.code,
          num_publish: params.num_publish,
          num_person: params.num_person,
          total_time: params.total_time,
          num_page: params.num_page,
        },
        { transaction }
      );
      await transaction.commit();

      return book.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.book.BookUpdateParam,
    bookId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const bookUpdate = await this.findById(bookId);
      if (bookUpdate) {
        const book = await bookUpdate.update(
          {
            name: params.name,
            code: params.code,
            num_publish: params.num_publish,
            num_person: params.num_person,
            total_time: params.total_time,
            num_page: params.num_page,
          },
          { transaction }
        );
        await transaction.commit();

        return book.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (bookId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const book = this.model.destroy({
        where: {
          id: bookId,
        },
      });

      return book;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (bookId: string | number) => {
    return await this.model.findByPk(bookId);
  };
}
