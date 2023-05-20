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
import { Classes } from './class';

export class Year
  extends Model<InferAttributes<Year>, InferCreationAttributes<Year>>
  implements types.year.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare startDate: Date;
  declare endDate: Date;
  declare semester: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Year.hasMany(Classes);
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Year.init(
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
      startDate: {
        type: dt.DATE,
        allowNull: true,
        field: 'startDate'
      },
      endDate: {
        type: dt.DATE,
        allowNull: true,
        field: 'endDate'
      },
      semester: {
        type: dt.STRING,
        allowNull: true,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'years', plural: 'years' },
      tableName: 'years',
      underscored: true,
      paranoid: true,
    }
  );

  return Year;
};
