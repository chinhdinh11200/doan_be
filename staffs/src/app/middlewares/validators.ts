import { map } from 'lodash';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const validateResult = validationResult(req);

  if (!validateResult.isEmpty()) {
    const errors = map(
      validateResult.array({ onlyFirstError: false }),
      (messageError) => {
        if (typeof messageError.msg === 'object') {
          let str = messageError.msg.message;
          let statusCode = messageError.msg.statusCode;
          let fieldName = messageError.msg.args;
          if (typeof fieldName === 'array') {

          } else {

          }
          console.log("fileName type", typeof fieldName);
          
          str = str.replace(new RegExp(`%1`, 'g'));
          return { str, statusCode, fieldName };
        }
      }
    );
    res.json(errors);
  } else {
    next();
  }
};
