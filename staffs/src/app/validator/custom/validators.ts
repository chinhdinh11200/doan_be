import { set } from 'lodash';
import { ValidationChain } from 'express-validator';
import { messageValidation, statusValidation } from '../../../common';

export const isDigits = (check: ValidationChain, fieldName: string) =>
  check
    .custom((value, meta) => {
      // workaround to get japanese name of id field
      set(meta.req, `locals.${meta.path}`, fieldName);

      return /^\d+$/.test(value);
    })
    .withMessage('test ccc');

export const required = (check: ValidationChain, fieldName: string) =>
  check
    .exists({checkFalsy: true})
    .withMessage({ message: messageValidation.required, args: [fieldName], statusCode: statusValidation.required });
