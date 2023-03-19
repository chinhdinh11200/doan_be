import * as express from 'express';

import userRouter from './user';
import departmentRouter from './department';
import subjectRouter from './subject';
import classRouter from './class';
import roomRouter from './room';
import markRouter from './mark';
import examRouter from './exam';
import { DB } from '../../models';

export default function (db: DB) {
  const router = express.Router();

  router.use('/user', userRouter(db));
  router.use('/department', departmentRouter(db));
  router.use('/subject', subjectRouter(db));
  router.use('/class', classRouter(db));
  router.use('/room', roomRouter(db));
  router.use('/mark', markRouter(db));
  router.use('/exam', examRouter(db));

  return router;
}
