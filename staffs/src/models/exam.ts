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
  declare readonly semester_id: number;
  declare readonly subject_id: number;
  declare name: string;
  declare code: string;
  declare form_exam: string;
  declare number_question: number;
  declare number_quizzes: CreationOptional<number>;
  declare marking: CreationOptional<number>;
  declare exam_create: CreationOptional<number>;
  declare exam_supervision: CreationOptional<number>;
  declare num_student: CreationOptional<number>;
  declare num_code: number;
  declare time_work: number;
  declare type: number;

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
      semester_id: {
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
      number_question: {
        type: dt.INTEGER,
      },
      num_code: {
        type: dt.INTEGER,
      },
      num_student: {
        type: dt.INTEGER,
      },
      form_exam: {
        type: dt.INTEGER,
        allowNull: true,
      },
      number_quizzes: {
        type: dt.INTEGER,
        allowNull: true,
      },
      marking: {
        type: dt.INTEGER,
        allowNull: true,
      },
      exam_create: {
        type: dt.INTEGER,
        allowNull: true,
      },
      exam_supervision: {
        type: dt.INTEGER,
        allowNull: true,
      },
      time_work: {
        type: dt.INTEGER,
        allowNull: true,
      },

      type: {
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
