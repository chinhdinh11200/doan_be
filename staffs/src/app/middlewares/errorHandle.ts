import * as createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';
import { get, map } from 'lodash';
import * as Sequelize from 'sequelize';

// import { errors, messages } from '../../common';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("handle error", err);
  // debug(err);
  if (res.headersSent) {
    next(err);

    return;
  }
  const errorArr = [];

  if (err instanceof Sequelize.ValidationError) {
    res.status(BAD_REQUEST).json({
      errors: map(err.errors, 'message')
    });
  } else if (err instanceof Array && typeof err[0] === 'string') {
    res.status(BAD_REQUEST).json({ errors: err });
  } else {
    let responseError = err;
    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      // responseError = new errors.Argument(
      //   // err?.fields[0],
      //   // messages.notFoundParameterError(
      //   //   get(req, `locals.${err?.fields[0]}`) || ''
      //   // )
      // );
    }
    // else if (!(err instanceof errors.Error)) {
    //   // responseError = new errors.Error('InternalServerError', err.message);
    // }
    if (responseError.httpStatus === 400 || responseError.httpStatus === 404) {
      res.status(responseError.httpStatus).json({
        errors: [responseError.message]
      });
    } else if (responseError.httpStatus === 401) {
      res.status(responseError.httpStatus).json({
        errors: ['Authentication error']
      });
    } else {
      errorArr.push(responseError.message);
      res.status(responseError.httpStatus).json({
        errors: errorArr
      });
    }
  }
};
