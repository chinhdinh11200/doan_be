import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';
import { types } from '../common';
import { commonFields } from './_common';
import { Department } from './department';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> implements types.user.Attr {
  declare readonly id: CreationOptional<number>;
  declare readonly department_id : number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare salt: string;
  declare code: string;
  declare birthday: Date;
  declare position: string;
  declare degree: string;
  declare number_salary: number;
  declare income: number;
  declare time_per_year: number;
  declare time_reserve: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    User.belongsTo(Department, { foreignKey: 'department_id' });
  }

}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  User.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      department_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: dt.STRING,
      },
      email: {
        type: dt.STRING,
      },
      password: {
        type: dt.STRING,
      },
      salt: {
        type: dt.STRING,
      },
      code: {
        type: dt.STRING,
      },
      birthday: {
        type: dt.DATE,
      },
      position: {
        type: dt.STRING,
      },
      number_salary: {
        type: dt.STRING,
      },
      income: {
        type: dt.NUMBER,
      },
      time_per_year: {
        type: dt.NUMBER,
      },
      time_reserve: {
        type: dt.NUMBER,
        defaultValue: 0,
      },
      degree: {
        type: dt.STRING,
      },
      ...commonFields()
    },
    {
      sequelize,
      tableName: 'users',
      name: {plural: 'users', singular: 'users'},
      underscored: false,
      paranoid: true,
    }
  );

  return User;
}
