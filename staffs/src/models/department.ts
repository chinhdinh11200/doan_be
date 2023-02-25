import { types } from '../common';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { commonFields } from './_common';
import { User } from './user';

export class Department
  extends Model<
    InferAttributes<Department>,
    InferCreationAttributes<Department>
  >
  implements types.department.Attr
{
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare code: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Department.hasMany(User, { foreignKey: 'department_id' });
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Department.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: dt.STRING,
      },
      code: {
        type: dt.STRING,
      },
      ...commonFields(),
    },
    {
      sequelize,
      tableName: 'departments',
      underscored: false,
      paranoid: true,
    }
  );
  return Department;
};
