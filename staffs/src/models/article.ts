import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from 'sequelize';
import { types } from '../common';
import { commonFields } from './_common';
import { User } from './user';
import { RoleUser } from './role_user';
import { Year } from './year';

export class Article
  extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> implements types.article.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare type: number;
  declare index_article: number;
  declare num_person: number;
  declare total_time: number;
  declare year_id: CreationOptional<number>;
  declare open_access: CreationOptional<number>;
  declare open_access_scopus: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Article.belongsToMany(User, {through: RoleUser, foreignKey: 'role_able_id'})
    Article.belongsTo(Year, { foreignKey: 'year_id', as: 'year' })
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Article.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: dt.STRING,
      },
      code: {
        type: dt.STRING,
      },
      open_access: {
        type: dt.NUMBER,
      },
      open_access_scopus: {
        type: dt.NUMBER,
      },
      type: {
        type: dt.INTEGER,
      },
      index_article: {
        type: dt.INTEGER,
      },
      num_person: {
        type: dt.INTEGER,
      },
      year_id: {
        type: dt.INTEGER,
      },
      total_time: {
        type: dt.INTEGER,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'articles', plural: 'articles' },
      tableName: 'articles',
      underscored: false,
      paranoid: true,
    }
  );

  return Article;
};
