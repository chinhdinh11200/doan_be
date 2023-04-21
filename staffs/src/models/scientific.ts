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

export class Scientific
  extends Model<InferAttributes<Scientific>, InferCreationAttributes<Scientific>> implements types.scientific.Attr {
  declare readonly id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare num_decision: string;
  // declare num_person: number;
  declare total_time: number;
  declare result_level: CreationOptional<number>;
  declare result_academy: CreationOptional<number>;
  declare date_decision: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Scientific.belongsToMany(User, { through: RoleUser, foreignKey: 'role_able_id' })
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Scientific.init(
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
      },
      date_decision: {
        type: dt.DATE,
      },
      // num_person: {
      //   type: dt.INTEGER,
      // },
      result_level: {
        type: dt.INTEGER,
      },
      result_academy: {
        type: dt.INTEGER,
      },
      total_time: {
        type: dt.INTEGER,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'scientifics', plural: 'scientifics' },
      tableName: 'scientifics',
      underscored: false,
      paranoid: true,
    }
  );

  return Scientific;
};
