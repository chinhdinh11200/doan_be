import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Article extends BaseRepository {
  private readonly model: DB['Article'];
  constructor(db: DB) {
    super(db);

    this.model = db.Article;
  }
  
  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };

  public search = async (params: types.article.ArticleSearchParam) => {
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

    const articles = this.model.findAndCountAll(findOption);
    return articles;
  };
  public create = async (params: types.article.ArticleCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const article = await this.model.create(
        {
          name: params.name,
          code: params.code,
          type: params.type,
          index_article: params.index_article,
          total_time: params.total_time,
          num_person: params.num_person,
        },
        { transaction }
      );
      await transaction.commit();

      return article.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.article.ArticleUpdateParam,
    articleId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const articleUpdate = await this.findById(articleId);
      if (articleUpdate) {
        const article = await articleUpdate.update(
          {
            name: params.name,
            code: params.code,
            type: params.type,
            index_article: params.index_article,
            total_time: params.total_time,
            num_person: params.num_person,
          },
          { transaction }
        );
        await transaction.commit();

        return article.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (articleId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const article = this.model.destroy({
        where: {
          id: articleId,
        },
      });

      return article;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (articleId: string | number) => {
    return await this.model.findByPk(articleId);
  };
}
