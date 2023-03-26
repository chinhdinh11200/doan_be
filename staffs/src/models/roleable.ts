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

export class RoleAble
  extends Model<InferAttributes<RoleAble>, InferCreationAttributes<RoleAble>> {
  declare readonly id: CreationOptional<number>;
  declare readonly role_id: number;
  declare readonly role_able_id: number;
  declare time: string;
  declare type: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {}
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  RoleAble.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: dt.BIGINT.UNSIGNED,
      },
      role_able_id: {
        type: dt.BIGINT.UNSIGNED,
        references: {}
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
      name: { singular: 'role_ables', plural: 'role_ables' },
      tableName: 'role_ables',
      underscored: false,
      paranoid: true,
    }
  );

  return RoleAble;
};
