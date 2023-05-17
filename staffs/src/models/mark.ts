import { Exam } from './exam';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from 'sequelize';
import { types } from '../common';
import { User } from './user';
import { commonFields } from './_common';
import { Subject } from './subject';

export class Mark
  extends Model<InferAttributes<Mark>, InferCreationAttributes<Mark>>
  implements types.mark.Attr {
  declare readonly id: CreationOptional<number>;
  declare readonly subject_id: number;
  declare readonly user_id: number;
  declare form_mark: CreationOptional<number>;
  declare type: CreationOptional<number>;
  declare num_exam: CreationOptional<number>;
  declare factor: CreationOptional<number>;
  declare date_exam: CreationOptional<Date>;
  declare semester: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    Mark.belongsTo(Subject, { foreignKey: 'subject_id', as: 'subject' })
    Mark.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Mark.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      subject_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      user_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      type: {
        type: dt.INTEGER,
        allowNull: true,
      },
      num_exam: {
        type: dt.INTEGER,
        allowNull: true,
      },
      date_exam: {
        type: dt.DATE,
        allowNull: true,
      },
      factor: {
        type: dt.INTEGER,
        allowNull: true,
      },
      form_mark: {
        type: dt.INTEGER,
        allowNull: true,
      },
      semester: {
        type: dt.INTEGER,
        allowNull: true,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'marks', plural: 'marks' },
      tableName: 'marks',
      underscored: false,
      paranoid: true,
    }
  );

  return Mark;
};
