import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { DB } from '../models';
import { Op, WhereAttributeHash } from 'sequelize';
import { map } from 'lodash';

export default abstract class BaseRepository {
  public readonly db: DB;
  private readonly secret: string = process.env.JWT_SECRET || 'staff_services';

  constructor(db: DB) {
    this.db = db;
  }

  public signToken = async (
    data: { id: string; username: string },
    timeExpired: string
  ) => {
    const token = jwt.sign(data, this.secret, {
      expiresIn: timeExpired,
    });

    return { token };
  };

  public verifyToken = async () => {};

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
}
