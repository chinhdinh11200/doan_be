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

export class MarkStaff extends Model<
  InferAttributes<MarkStaff>,
  InferCreationAttributes<MarkStaff>
> {
  declare readonly mark_id: number;
  declare readonly user_id: number;

  declare createdAt: Date;
  declare deletedAt: Date;
  declare updatedAt: Date;

  public static ASSOCIATE() {}
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  MarkStaff.init(
    {
      mark_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      user_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },

      ...commonFields(),
    },
    {
      sequelize,
      tableName: 'mark_user',
      name: { plural: 'mark_user', singular: 'mark_user' },
      underscored: false,
      paranoid: true,
    }
  );

  return MarkStaff;
};
