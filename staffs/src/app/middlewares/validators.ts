import { map } from 'lodash';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';

export default async (req: Request, res: Response, next: NextFunction) => {
  const validateResult = validationResult(req);

  if (!validateResult.isEmpty()) {
    const errors = map(
      validateResult.array({ onlyFirstError: true }),
      (messageError) => {
        if (typeof messageError.msg === 'object') {
          let str = messageError.msg.message;
          let statusCode = messageError.msg.statusCode;
          let fieldName = messageError.msg.args;
          if (typeof fieldName === 'string') {
            str = str.replace(new RegExp(`%1`, 'g'), fieldName);
          } else {
            fieldName.map((item: any, index: any) => {
              str = str.replace(new RegExp(`%${index + 1}`, 'g'), item);
            });
          }

          return { message: str, statusCode, fieldName };
        }
      }
    );
    res.status(BAD_REQUEST).json(errors);
  } else {
    next();
  }
};
