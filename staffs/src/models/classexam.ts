import {
  CreationOptional,
  Sequelize,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
} from 'sequelize';
import { Model } from 'sequelize';
import { types } from '../common';
import { commonFields } from './_common';

export class ClassExam extends Model<
  InferAttributes<ClassExam>,
  InferCreationAttributes<ClassExam>
> {
  declare readonly class_id: number;
  declare readonly exam_id: number;

  declare createdAt: Date;
  declare deletedAt: Date;
  declare updatedAt: Date;

  public static ASSOCIATE() {}
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  ClassExam.init(
    {
      class_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      exam_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },

      ...commonFields(),
    },
    {
      sequelize,
      tableName: 'class_exam',
      name: { plural: 'class_exam', singular: 'class_exam' },
      underscored: false,
      paranoid: true,
    }
  );

  return ClassExam;
};
