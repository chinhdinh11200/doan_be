import { ICommonAttr, ICommonSearchOption } from './_common';

export interface IClassMainAttr {
  subject_id: number;
  user_id: number;
  parent_id: number;
  name: string;
  code: string;
  form_teach: string;
  number_student: number;
  classroom: string;
  startDate: string;
  endDate: string;
  level_teach: string;
  time_teach: string;
  semester: string;
}

export interface IClassAttr extends IClassMainAttr, ICommonAttr {}

export interface IClassCreateParam {
  subject_id: number;
  user_id: number;
  parent_id?: number;
  name: string;
  code: string;
  form_teach: string;
  number_student: number;
  classroom: string;
  startDate: string;
  endDate: string;
  level_teach: string;
  time_teach: string;
  semester: string;
}

export interface IClassUpdateParam {
  subject_id: number;
  user_id: number;
  parent_id: number;
  name: string;
  code: string;
  form_teach: string;
  number_student: number;
  classroom: string;
  startDate: string;
  endDate: string;
  level_teach: string;
  time_teach: string;
  semester: string;
}