import { set } from 'lodash';
import { ValidationChain } from 'express-validator';

export const emptyStringAsNull = (
  check: ValidationChain,
  _fieldNameJp: string
) =>
  check.custom((value, meta) => {
    if (value === undefined || value === null) {
      return true;
    } else if (value.length === 0) {      
      set(meta.req[meta.location], meta.path, undefined);      
    }

    return true;
  });