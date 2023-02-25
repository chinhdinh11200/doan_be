import { check } from 'express-validator';
import { types } from '../../common';
import { GenericCheckFn, body, S, V } from './custom';

const b: GenericCheckFn<types.user.Attr> = body;

const upsert = [body('name', [S.emptyStringAsNull])];

export const create = [
  ...upsert,
  b('name', 'name', [V.required]),
  b('code', 'code', [V.required]),
];
