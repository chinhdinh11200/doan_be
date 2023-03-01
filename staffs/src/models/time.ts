import { ClassTime } from './classTime';
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
import { Classes } from './class';

export class Time
  extends Model<InferAttributes<Time>, InferCreationAttributes<Time>>
  implements types.time.Attr
{
  declare readonly id: CreationOptional<number>;
  declare name: string;

  declare createdAt: Date;
  declare deletedAt: Date;
  declare updatedAt: Date;

  public static ASSOCIATE() {
    // Time.belongsToMany(Classes, { through: ClassTime });
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Time.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: dt.STRING,
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

  return Time;
};
