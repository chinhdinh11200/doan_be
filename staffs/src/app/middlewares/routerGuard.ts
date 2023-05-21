import { NextFunction, Request, Response } from "express";
import { FORBIDDEN } from "http-status";

const role = [0, 1, 2]

export const apiList = {
  users: 'users',
  departments: 'departments',
  marks: 'marks',
  thesis: 'thesis',
  books: 'books',
  inventions: 'inventions',
  rooms: 'rooms',
  exams: 'exams',
  articles: 'articles',
  scientifics: 'scientifics',
  educations: 'educations',
  compilations: 'compilations',
  topics: 'topics',
  classes: 'classes',
  subjects: 'subjects',
  exports: 'exports',
  imports: 'imports',
}
export const permissions = {
  [apiList.users]: role,
  [apiList.departments]: role,
  [apiList.marks]: role,
  [apiList.thesis]: role,
  [apiList.books]: role,
  [apiList.inventions]: role,
  [apiList.rooms]: role,
  [apiList.exams]: role,
  [apiList.articles]: role,
  [apiList.scientifics]: role,
  [apiList.educations]: role,
  [apiList.compilations]: role,
  [apiList.topics]: role,
  [apiList.classes]: role,
  [apiList.subjects]: role,
  [apiList.exports]: role,
  [apiList.imports]: role,
}

export const routeGuard = (apiName: string) => {
  const apiPermission = permissions[apiName];
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && apiPermission.indexOf(Number(req.user!.position)) >= 0) {
      next();
    } else {
      next();
      // res.status(FORBIDDEN).json({
      //   errors: ['Unauthorized URL']
      // });
    }
  };
};