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

export class ClassTime extends Model<
  InferAttributes<ClassTime>,
  InferCreationAttributes<ClassTime>
> {
  declare readonly id: CreationOptional<number>;
  declare readonly class_id: number;
  declare readonly time_id: number;

  declare createdAt: Date;
  declare deletedAt: Date;
  declare updatedAt: Date;

  public static ASSOCIATE() {}
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  ClassTime.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      class_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      time_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },

      ...commonFields(),
    },
    {
      sequelize,
      tableName: 'times',
      name: { plural: 'times', singular: 'times' },
      underscored: false,
      paranoid: true,
    }
  );

  return ClassTime;
};
