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

export class Compilation
  extends Model<InferAttributes<Compilation>, InferCreationAttributes<Compilation>> implements types.compilation.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare num_person: number;
  declare total_time: number;
  declare date_decision: Date;
  declare num_decision: string;
  declare number_credit: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() { }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Compilation.init(
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
      num_decision: {
        type: dt.STRING,
        allowNull: true
      },
      date_decision: {
        type: dt.DATE,
      },
      number_credit: {
        type: dt.INTEGER,
      },
      num_person: {
        type: dt.INTEGER,
      },
      total_time: {
        type: dt.INTEGER,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'compilations', plural: 'compilations' },
      tableName: 'compilations',
      underscored: false,
      paranoid: true,
    }
  );

  return Compilation;
};
