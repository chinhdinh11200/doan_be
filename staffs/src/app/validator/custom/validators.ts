import { User } from './../../../models/user';
import { set } from 'lodash';
import { ValidationChain, check } from 'express-validator';
import { messageValidation, statusValidation } from '../../../common';

export const isDigits = (check: ValidationChain, fieldName: string) =>
  check
    .custom((value, meta) => {
      // workaround to get japanese name of id field
      set(meta.req, `locals.${meta.path}`, fieldName);

      return /^\d+$/.test(value);
    })
    .withMessage({ message: messageValidation.number, args: fieldName, statusCode: statusValidation.number });

export const isFloat = (check: ValidationChain, fieldName: string) =>
  check
    .custom((value, meta) => {
      // workaround to get japanese name of id field
      set(meta.req, `locals.${meta.path}`, fieldName);

      return /^\d.+$/.test(value);
    })
    .withMessage({ message: messageValidation.number, args: fieldName, statusCode: statusValidation.number });

export const required = (check: ValidationChain, fieldName: string) =>
  check.exists({ checkFalsy: true }).withMessage({
    message: messageValidation.required,
    args: fieldName,
    statusCode: statusValidation.required,
  });

export const duplicated = (check: ValidationChain, fieldName: string) =>
  check
    .custom((value) => {
      return User.findOne({
        where: {
          [fieldName]: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("cccccc");
        } else {
          return Promise.resolve(true);
        }
      });
    })
    .withMessage({ message: messageValidation.unique, args: [fieldName], statusCode: statusValidation.unique });
