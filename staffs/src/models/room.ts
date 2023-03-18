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
  declare readonly exam_id: number;
  declare name: string;
  declare code: string;
  declare num_student: number;
  declare startDate: string;
  declare endDate: string;
  declare semester: string;

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
      exam_id: {
        type: dt.BIGINT.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: dt.STRING,
      },
      code: {
        type: dt.STRING,
      },
      num_student: {
        type: dt.INTEGER,
      },
      startDate: {
        type: dt.STRING,
        allowNull: true,
      },
      endDate: {
        type: dt.STRING,
        allowNull: true,
      },
      semester: {
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
