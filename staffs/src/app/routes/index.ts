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
  router.use('/department', routeGuard(apiList.departments), departmentRouter(db));
  router.use('/subject', routeGuard(apiList.subjects), subjectRouter(db));
  router.use('/class', routeGuard(apiList.classes), classRouter(db));
  router.use('/room', routeGuard(apiList.rooms), roomRouter(db));
  router.use('/mark', routeGuard(apiList.marks), markRouter(db));
  router.use('/exam', routeGuard(apiList.exams), examRouter(db));
  router.use('/topic', routeGuard(apiList.topics), topicRouter(db));
  router.use('/article', routeGuard(apiList.articles), articleRouter(db));
  router.use('/compilation', routeGuard(apiList.compilations), compilationRouter(db));
  router.use('/invention', routeGuard(apiList.inventions), inventionRouter(db));
  router.use('/scientific', routeGuard(apiList.scientifics), scientificRouter(db));
  router.use('/book', routeGuard(apiList.books), bookRouter(db));
  router.use('/education', routeGuard(apiList.educations), educationRouter(db));
  router.use('/time', timeRouter(db));
  router.use('/export', routeGuard(apiList.exports), exportRouter(db));
  router.use('/import', routeGuard(apiList.imports), importRouter(db));
  router.use('/thesis', routeGuard(apiList.thesis), theisRouter(db));
  router.use('/year', yearRouter(db));

  return router;
}
