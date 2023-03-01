import * as express from 'express';

import userRouter from './user';
import departmentRouter from './department';
import subjectRouter from './subject';
import { DB } from '../../models';

export default function (db: DB) {
  const router = express.Router();

  router.use('/user', userRouter(db));
  router.use('/department', departmentRouter(db));
  router.use('/subject', subjectRouter(db));

  return router;
}
