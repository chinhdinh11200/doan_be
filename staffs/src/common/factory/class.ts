import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IClassMainAttr {
  subject_id: number;
  user_id: number;
  parent_id?: number;
  name: string;
  code: string;
  marking: number;
  exam_create: number;
  exam_supervision: number;
  form_exam: number;
  form_teach: string;
  num_student: number;
  num_lesson: number;
  num_credit: number;
  classroom: string;
  startDate: string;
  endDate: string;
  level_teach: string;
  time_teach: string;
  semester: string;
}

export interface IClassAttr extends IClassMainAttr, ICommonAttr { }

export interface IClassCreateParam {
  subject_id: number;
  user_id?: number;
  parent_id?: number;
  name: string;
  code: string;
  form_teach: string;
  marking?: number;
  exam_create?: number;
  form_exam?: number;
  exam_supervision?: number;
  num_student: number; 
  num_lesson: number;
  num_credit: number;
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
  marking?: number;
  exam_create?: number;
  form_exam?: number;
  exam_supervision?: number;
  form_teach: string;
  num_student: number;
  num_lesson: number;
  num_credit: number;
  classroom: string;
  startDate: string;
  endDate: string;
  level_teach: string;
  time_teach: string;
  semester: string;
}

export interface IClassSearchParam extends ICommonSearchOption, ICommonSortOption {
  name?: string;
  code?: string;
  form_teach?: string;
  search?: string;
  parent_id?: boolean;
}