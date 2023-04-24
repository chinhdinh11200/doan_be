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
import { Subject } from './subject';
import { Exam } from './exam';
import { ClassExam } from './classexam';

export class Classes
  extends Model<InferAttributes<Classes>, InferCreationAttributes<Classes>>
  implements types.classes.Attr {
  declare readonly id: CreationOptional<number>;
  declare readonly user_id: number;
  declare readonly subject_id: number;
  declare readonly parent_id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare form_teach: string;
  declare num_student: number;
  declare num_lesson: number;
  declare num_credit: number;
  declare marking: CreationOptional<number>;
  declare exam_create: CreationOptional<number>;
  declare exam_supervision: CreationOptional<number>;
  declare classroom: string;
  declare startDate: string;
  declare endDate: string;
  declare level_teach: string;
  declare time_teach: string;
  declare semester: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Classes.belongsTo(User, { foreignKey: 'user_id' });
    Classes.belongsTo(Subject, { foreignKey: 'subject_id' });
    // Classes.belongsToMany(Exam, {through: ClassExam});
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Classes.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      subject_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      user_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      parent_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: dt.STRING,
      },
      code: {
        type: dt.STRING,
      },
      form_teach: {
        type: dt.STRING,
      },
      num_student: {
        type: dt.INTEGER,
      },
      num_lesson: {
        type: dt.INTEGER,
      },
      num_credit: {
        type: dt.INTEGER,
      },
      marking: {
        type: dt.INTEGER,
      },
      exam_create: {
        type: dt.INTEGER,
      },
      exam_supervision: {
        type: dt.INTEGER,
      },
      classroom: {
        type: dt.STRING,
        allowNull: true,
      },
      startDate: {
        type: dt.STRING,
        allowNull: true,
      },
      endDate: {
        type: dt.STRING,
        allowNull: true,
      },
      level_teach: {
        type: dt.STRING,
        allowNull: true,
      },
      time_teach: {
        type: dt.STRING,
        allowNull: true,
      },
      semester: {
        type: dt.STRING,
        allowNull: true,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'classes', plural: 'classes' },
      tableName: 'classes',
      underscored: false,
      paranoid: true,
    }
  );

  return Classes;
};
