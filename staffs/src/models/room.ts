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
import { Exam } from './exam';

export class Room
  extends Model<InferAttributes<Room>, InferCreationAttributes<Room>>
  implements types.room.Attr {
  declare readonly id: CreationOptional<number>;
  declare readonly subject_id: CreationOptional<number>;
  declare readonly user_id: CreationOptional<number>;
  declare name: CreationOptional<string>;
  declare code: CreationOptional<string>;
  declare num_student: CreationOptional<number>;
  declare time: CreationOptional<number>;
  declare type: CreationOptional<number>;
  declare factor: CreationOptional<number>;
  declare semester: CreationOptional<number>;
  declare num_exam_session: CreationOptional<number>;
  declare startDate: CreationOptional<string>;
  declare endDate: CreationOptional<string>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  public static ASSOCIATE() { 
    // Room.belongsTo(Exam); 
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Room.init(
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
      name: {
        type: dt.STRING,
        allowNull: true,
      },
      code: {
        type: dt.STRING,
        allowNull: true,
      },
      time: {
        type: dt.INTEGER,
        allowNull: true,
      },
      num_exam_session: {
        type: dt.INTEGER,
        allowNull: true,
      },
      type: {
        type: dt.INTEGER,
        allowNull: true,
      },
      factor: {
        type: dt.INTEGER,
        allowNull: true,
      },
      semester: {
        type: dt.INTEGER,
        allowNull: true,
      },
      num_student: {
        type: dt.INTEGER,
        allowNull: true,
      },
      startDate: {
        type: dt.STRING,
        allowNull: true,
      },
      endDate: {
        type: dt.STRING,
        allowNull: true,
      },
      ...commonFields(),
    },
    {
      sequelize,
      name: { singular: 'rooms', plural: 'rooms' },
      tableName: 'rooms',
      underscored: false,
      paranoid: true,
    }
  );

  return Room;
};
