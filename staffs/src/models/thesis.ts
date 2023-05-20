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
import { RoleUser } from './role_user';
import { User } from './user';
import { ThesisUser } from './thesisUser';

export class Thesis
  extends Model<InferAttributes<Thesis>, InferCreationAttributes<Thesis>> implements types.thesis.Attr {
  declare readonly id: CreationOptional<number>;
  declare course: string;
  declare name_student: string;
  declare num_year: number;
  declare num_person: number;
  declare num_decision: string;
  declare type: number;
  declare total_time: number;
  declare year_id: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Thesis.belongsToMany(User, { through: ThesisUser, foreignKey: 'thesis_id' })
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Thesis.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name_student: {
        type: dt.STRING,
      },
      course: {
        type: dt.STRING,
      },
      num_decision: {
        type: dt.STRING,
      },
      type: {
        type: dt.INTEGER,
      },
      num_person: {
        type: dt.INTEGER,
      },
      num_year: {
        type: dt.INTEGER,
      },
      year_id: {
        type: dt.INTEGER,
      },
      total_time: {
        type: dt.INTEGER,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'thesis', plural: 'thesis' },
      tableName: 'thesis',
      underscored: false,
      paranoid: true,
    }
  );

  return Thesis;
};
