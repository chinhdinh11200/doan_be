import * as express from 'express';

import userRouter from './user';
import departmentRouter from './department';
import subjectRouter from './subject';
import classRouter from './class';
import roomRouter from './room';
import markRouter from './mark';
import examRouter from './exam';
import bookRouter from './book';
import articleRouter from './article';
import topicRouter from './topic';
import compilationRouter from './compilation';
import scientificRouter from './scientific';
import educationRouter from './education';
import inventionRouter from './invention';
import timeRouter from './time';
import exportRouter from './export';
import importRouter from './import';
import theisRouter from './theis';
import yearRouter from './year';
import { DB } from '../../models';
import { apiList, routeGuard } from '../middlewares/routerGuard';

export default function (db: DB) {
  const router = express.Router();

  router.use('/user', routeGuard(apiList.users), userRouter(db));
  router.use('/department', departmentRouter(db));
  router.use('/subject', subjectRouter(db));
  router.use('/class', classRouter(db));
  router.use('/room', roomRouter(db));
  router.use('/mark', markRouter(db));
  router.use('/exam', examRouter(db));
  router.use('/topic', topicRouter(db));
  router.use('/article', articleRouter(db));
  router.use('/compilation', compilationRouter(db));
  router.use('/invention', inventionRouter(db));
  router.use('/scientific', scientificRouter(db));
  router.use('/book', bookRouter(db));
  router.use('/education', educationRouter(db));
  router.use('/time', timeRouter(db));
  router.use('/export', exportRouter(db));
  router.use('/import', importRouter(db));
  router.use('/thesis', theisRouter(db));
  router.use('/year', yearRouter(db));

  return router;
}
