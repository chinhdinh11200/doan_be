import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from 'sequelize';
import { types } from '../common';
import { User } from './user';
import { commonFields } from './_common';
import { Mark } from './mark';
import { Room } from './room';
import { Classes } from './class';
import { ClassExam } from './classexam';

export class Exam
  extends Model<InferAttributes<Exam>, InferCreationAttributes<Exam>>
  implements types.exam.Attr {
  declare readonly id: CreationOptional<number>;
  declare readonly user_id: number;
  declare readonly subject_id: number;
  declare name: CreationOptional<string>;
  declare code: CreationOptional<string>;
  declare factor: CreationOptional<number>;
  declare num_question: CreationOptional<number>;
  declare type: CreationOptional<number>;
  declare num_exam: CreationOptional<number>;
  declare semester: CreationOptional<number>;
  declare year_id: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Exam.belongsTo(User, { foreignKey: 'user_id' });
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Exam.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      subject_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: dt.STRING,
      },
      code: {
        type: dt.STRING,
      },
      factor: {
        type: dt.INTEGER,
        allowNull: true,
      },
      semester: {
        type: dt.INTEGER,
        allowNull: true,
      },
      num_question: {
        type: dt.INTEGER,
        allowNull: true,
      },
      num_exam: {
        type: dt.INTEGER,
        allowNull: true,
      },
      type: {
        type: dt.INTEGER,
        allowNull: true,
      },
      year_id: {
        type: dt.INTEGER,
        allowNull: true,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'exams', plural: 'exams' },
      tableName: 'exams',
      underscored: false,
      paranoid: true,
    }
  );

  return Exam;
};
