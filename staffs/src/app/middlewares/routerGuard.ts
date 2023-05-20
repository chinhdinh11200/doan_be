import { NextFunction, Request, Response } from "express";
import { FORBIDDEN } from "http-status";

const role = [0, 1, 2]

export const apiList = {
  users: 'users'
}
export const permissions = {
  [apiList.users]: role,
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