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

export class Invention
  extends Model<InferAttributes<Invention>, InferCreationAttributes<Invention>> implements types.invention.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare level: number;
  declare num_person: number;
  declare total_time: number;
  declare number_recognition: string;
  declare date_recognition: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() { }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Invention.init(
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
      level: {
        type: dt.INTEGER,
      },
      date_recognition: {
        type: dt.DATE,
      },
      number_recognition: {
        type: dt.STRING,
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
      name: { singular: 'inventions', plural: 'inventions' },
      tableName: 'inventions',
      underscored: false,
      paranoid: true,
    }
  );

  return Invention;
};
