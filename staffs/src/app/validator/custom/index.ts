import { ValidationChain, body as b } from 'express-validator';

import * as validators from './validators';
import * as sanitizers from './sanitizers';

export const S = sanitizers;
export const V = validators;

type CustomRuleChecker = (
  check: ValidationChain,
  fieldName: string
) => ValidationChain;

export interface GenericCheckFn<T> {
  (field: keyof T | (keyof T)[], rules?: CustomRuleChecker[]): ValidationChain;
  (
    field: keyof T | (keyof T)[],
    fieldName?: string,
    rules?: CustomRuleChecker[]
  ): ValidationChain;
}

const validator = (
  checkType: 'body' | 'query',
  field: string | string[],
  fileNameOrRules?: string | CustomRuleChecker[],
  rules?: CustomRuleChecker[]
) => {
  let check = b(field);
  
  let fieldName = '';
  let ruleSet: CustomRuleChecker[] | undefined = rules;
  if (typeof fileNameOrRules === 'string') {
    fieldName = fileNameOrRules;
  } else {
    ruleSet = fileNameOrRules;
  }

  if (ruleSet !== undefined) {
    for (const rule of ruleSet) {
      check = rule(check, fieldName);
    }
  }

  return check;
};

export function body(
  field: string | string[],
  rules?: CustomRuleChecker[]
): ValidationChain;

export function body(
  field: string | string[],
  fieldName?: string,
  rules?: CustomRuleChecker[]
): ValidationChain;

export function body(
  field: string | string[],
  fieldNameOrRule?: string | CustomRuleChecker[],
  rules?: CustomRuleChecker[]
) {
  return validator('body', field, fieldNameOrRule, rules);
}
