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
  import { Role } from './role';
  import { RoleAble } from './roleable';

  export class Topic
    extends Model<InferAttributes<Topic>, InferCreationAttributes<Topic>> implements types.topic.Attr {
    declare readonly id: CreationOptional<number>;
    declare name: string;
    declare code: string;
    declare level: number;
    declare endDate: Date;
    declare startDate: Date;
    declare acceptDate: Date;
    declare result: number;
    declare num_person: number;
    declare total_time: number;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;

    public static ASSOCIATE() {
      Topic.belongsToMany(User, { through: { model: RoleUser, unique: false }, foreignKey: 'role_able_id' })
    }
  }

  export default (sequelize: Sequelize, dt: typeof DataTypes) => {
    Topic.init(
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
          allowNull: true,
        },
        endDate: {
          type: dt.DATE,
          allowNull: true,
        },
        startDate: {
          type: dt.DATE,
          allowNull: true,
        },
        acceptDate: {
          type: dt.DATE,
          allowNull: true,
        },
        result: {
          type: dt.INTEGER,
          allowNull: true,
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
        name: { singular: 'topics', plural: 'topics' },
        tableName: 'topics',
        underscored: false,
        paranoid: true,
      }
    );

    return Topic;
  };
