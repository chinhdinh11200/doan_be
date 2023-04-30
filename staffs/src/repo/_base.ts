import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { FindOptions, Op, WhereAttributeHash } from 'sequelize';
import { map } from 'lodash';
import { DB } from '../models';

export default abstract class BaseRepository {
  public readonly db: DB;
  private readonly secret: string = process.env.JWT_SECRET || 'staff_services';

  constructor(db: DB) {
    this.db = db;
  }

  public signToken = async (
    data: { id: string; username: string, email: string, code: string, role: string | number, position: string | number },
    timeExpired: string
  ) => {
    const token = jwt.sign(data, this.secret, {
      expiresIn: timeExpired,
    });

    return { token };
  };

  public verifyToken = async () => { };

  public hashPassword = (password: string, salt?: string) => {
    if (salt == null) {
      salt = crypto.randomBytes(16).toString('hex');
    }
    const hashPassword = crypto
      .createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    return {
      salt,
      password: hashPassword,
    };
  };

  public convertStringToArray = (input: string) => {
    return input.split(',');
  }

  public makeAmbiguousCondition = <T extends object>(
    params: T,
    field: keyof T,
    searchField?: string
  ): WhereAttributeHash => {
    if (searchField === undefined) {
      return {
        [field]: { [Op.like]: `%${params[field]}%` },
      };
    } else {
      return {
        [searchField]: { [Op.like]: `%${params[field]}%` },
      };
    }
  };

  public makeMultipleAmbiguousCondition = <T extends object>(
    params: T,
    field: keyof T,
    searchFields: string[]
  ) => ({
    [Op.or]: map(searchFields, searchField => this.makeAmbiguousCondition(params, field, searchField))
  });

  public getSecret = () => this.secret;

  protected setOffsetLimit(
    findOptions: FindOptions,
    option?: { offset?: string | number; limit?: string | number }
  ) {
    if (option !== undefined) {
      if (!isNaN(Number(option.offset)) && option.offset !== '') {
        findOptions.offset = Number(option.offset);
      }

      if (!isNaN(Number(option.limit)) && option.limit !== '') {
        findOptions.limit = Number(option.limit);
      }
    }
  }
}
