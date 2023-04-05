import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface ISubjectMainAttr {
  name: string;
  code: string;
  form_exam: string;
}

export interface ISubjectAttr extends ISubjectMainAttr, ICommonAttr {}

export interface ISubjectCreateParam {
  name: string;
  code: string;
  form_exam: string;
}

export interface ISubjectUpdateParam {
  name: string;
  code: string;
  form_exam: string;
}

export interface ISubjectSearchParam extends ICommonSearchOption, ICommonSortOption {
  name?: string;
  code?: string;
  form_exam?: string;
  search?: string;
}