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
import { User } from './user';
import { RoleUser } from './role_user';
import { Year } from './year';

export class Education
  extends Model<InferAttributes<Education>, InferCreationAttributes<Education>> implements types.education.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare num_credit: number;
  declare total_time: number;
  declare num_person: number;
  declare form_construction: number;
  declare num_decision: string;
  declare date_decision: Date;
  declare year_id: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Education.belongsToMany(User, {through: RoleUser, foreignKey: 'role_able_id'});
    Education.belongsTo(Year, { foreignKey: 'year_id', as: 'year' })
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Education.init(
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
      code: {
        type: dt.STRING,
      },
      date_decision: {
        type: dt.DATE,
      },
      num_credit: {
        type: dt.INTEGER,
      },
      form_construction: {
        type: dt.INTEGER,
      },
      num_person: {
        type: dt.INTEGER,
      },
      num_decision: {
        type: dt.STRING,
      },
      total_time: {
        type: dt.INTEGER,
      },
      year_id: {
        type: dt.INTEGER,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'educations', plural: 'educations' },
      tableName: 'educations',
      underscored: false,
      paranoid: true,
    }
  );

  return Education;
};
