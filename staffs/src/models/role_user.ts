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

export class RoleUser
  extends Model<InferAttributes<RoleUser>, InferCreationAttributes<RoleUser>> {
  declare readonly id: CreationOptional<number>;
  declare readonly role_able_id: number;
  declare readonly user_id: number;
  declare time: string;
  declare type: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {}
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  RoleUser.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role_able_id: {
        type: dt.BIGINT.UNSIGNED,
      },
      user_id: {
        type: dt.BIGINT.UNSIGNED,
      },
      time: {
        type: dt.STRING,
      },
      type: {
        type: dt.INTEGER,
        allowNull: true,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'role_user', plural: 'role_user' },
      tableName: 'role_user',
      underscored: false,
      paranoid: true,
    }
  );

  return RoleUser;
};
