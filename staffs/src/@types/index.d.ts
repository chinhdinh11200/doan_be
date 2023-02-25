import { types } from '../common';
import { initialize } from '../models';

type db = ReturnType<typeof initialize>;

declare global {
  namespace Express {
    interface User extends types.auth.UserInfo {}
  }

  type SQLize = db;
}
