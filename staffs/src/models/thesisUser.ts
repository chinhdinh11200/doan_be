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

export class ThesisUser
  extends Model<InferAttributes<ThesisUser>, InferCreationAttributes<ThesisUser>> {
  declare readonly id: CreationOptional<number>;
  declare readonly thesis_id: number;
  declare readonly user_id: number;
  declare time: number;
  declare type: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {}
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  ThesisUser.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      thesis_id: {
        type: dt.BIGINT.UNSIGNED,
      },
      user_id: {
        type: dt.BIGINT.UNSIGNED,
      },
      time: {
        type: dt.INTEGER,
      },
      type: {
        type: dt.INTEGER,
        allowNull: true,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'thesis_user', plural: 'thesis_user' },
      tableName: 'thesis_user',
      underscored: false,
      paranoid: true,
    }
  );

  return ThesisUser;
};
