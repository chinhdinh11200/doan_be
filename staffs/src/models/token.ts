import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  Sequelize,
  literal,
  CreationOptional,
} from 'sequelize';
import { types } from '../common';

export class Token
  extends Model<InferAttributes<Token>, InferCreationAttributes<Token>>
  implements types.token.Attr
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare token: string;
  declare createdAt: CreationOptional<Date>;
  public static ASSOCIATE() {}
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Token.init(
    {
      id: {
        type: dt.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: dt.STRING,
      },
      token: {
        type: dt.STRING,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'tokens',
      name: { plural: 'users', singular: 'users' },
      underscored: false,
      timestamps: false,
    }
  );

  return Token;
};
