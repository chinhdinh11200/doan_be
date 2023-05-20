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

export class Book
  extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> implements types.book.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare num_publish: string;
  declare num_page: number;
  declare num_person: number;
  declare total_time: number;
  declare type: number;
  declare year_id: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Book.belongsToMany(User, { through: RoleUser, foreignKey: 'role_able_id' })
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Book.init(
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
      num_publish: {
        type: dt.STRING,
      },
      num_page: {
        type: dt.INTEGER,
      },
      num_person: {
        type: dt.INTEGER,
      },
      type: {
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
      name: { singular: 'books', plural: 'books' },
      tableName: 'books',
      underscored: false,
      paranoid: true,
    }
  );

  return Book;
};
