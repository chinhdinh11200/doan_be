import * as express from 'express';

import userRouter from './user';
import departmentRouter from './department';
import authRouter from './auth';
import { Sequelize } from 'sequelize';
import { DB } from '../../models';

export default function (db: DB) {
  const router = express.Router();

  router.use('/user', userRouter(db));
  router.use('/department', departmentRouter(db));

  return router;
}
