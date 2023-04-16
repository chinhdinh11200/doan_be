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
import { Topic } from './topic';
import { RoleAble } from './roleable';

export class Role
  extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>
  implements types.role.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare time: string;
  declare type: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    // Role.belongsToMany(Topic, { through: RoleAble, foreignKey: 'role', constraints: false })
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Role.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: dt.STRING,
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
      name: { singular: 'roles', plural: 'roles' },
      tableName: 'roles',
      underscored: false,
      paranoid: true,
    }
  );

  return Role;
};
