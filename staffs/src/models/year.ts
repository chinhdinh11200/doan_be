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
import { Classes } from './class';
import { Book } from './book';
import { Invention } from './invention';
import { Article } from './article';
import { Topic } from './topic';
import { Education } from './education';
import { Compilation } from './compilation';
import { Scientific } from './scientific';
import { Exam } from './exam';
import { Room } from './room';
import { Mark } from './mark';

export class Year
  extends Model<InferAttributes<Year>, InferCreationAttributes<Year>>
  implements types.year.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare startDate: Date;
  declare endDate: Date;
  declare semester: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Year.hasMany(Classes, {foreignKey: 'year_id', as: 'classes'});
    Year.hasMany(Exam, {foreignKey: 'year_id', as: 'exams'});
    Year.hasMany(Room, {foreignKey: 'year_id', as: 'rooms'});
    Year.hasMany(Mark, {foreignKey: 'year_id', as: 'marks'});
    Year.hasMany(Book, {foreignKey: 'year_id', as: 'books'});
    Year.hasMany(Invention, {foreignKey: 'year_id', as: 'inventions'});
    Year.hasMany(Article, {foreignKey: 'year_id', as: 'articles'});
    Year.hasMany(Topic, {foreignKey: 'year_id', as: 'topics'});
    Year.hasMany(Education, {foreignKey: 'year_id', as: 'educations'});
    Year.hasMany(Compilation, {foreignKey: 'year_id', as: 'compilations'});
    Year.hasMany(Scientific, {foreignKey: 'year_id', as: 'scientifics'});
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Year.init(
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
      startDate: {
        type: dt.DATE,
        allowNull: true,
        field: 'startDate'
      },
      endDate: {
        type: dt.DATE,
        allowNull: true,
        field: 'endDate'
      },
      semester: {
        type: dt.STRING,
        allowNull: true,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'years', plural: 'years' },
      tableName: 'years',
      underscored: true,
      paranoid: true,
    }
  );

  return Year;
};
