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
import { MarkStaff } from './markstaff';

export class Mark
  extends Model<InferAttributes<Mark>, InferCreationAttributes<Mark>>
  implements types.mark.Attr {
  declare readonly id: CreationOptional<number>;
  declare readonly exam_id: number;
  declare form_mark: number;
  declare time_mark: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() {
    // Mark.belongsTo(Exam, { foreignKey: 'exam_id' });
    // Mark.belongsToMany(User, { through: MarkStaff, uniqueKey: 'user_id' });
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
      exam_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      time_mark: {
        type: dt.STRING,
        allowNull: true,
      },
      form_mark: {
        type: dt.STRING,
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
