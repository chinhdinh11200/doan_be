import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { DB } from '../models';

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

  public getSecret = () => this.secret;
}
