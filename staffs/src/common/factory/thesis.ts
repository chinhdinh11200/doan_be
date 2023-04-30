import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IThesisMainAttr {
  // subject_id: number;
  // user_id: number;
  course: string; // khoá đào tạo
  name_student: string;
  num_year: number;
  num_decision: string;
  num_person: number;
  type: number;
  total_time: number;
}

export interface IThesisAttr extends IThesisMainAttr, ICommonAttr { }

export interface IThesisCreateParam {
  course: string; // khoá đào tạo
  name_student: string;
  num_year: number;
  num_decision: string;
  num_person: number;
  type: number;
  type_thesis: number;
  role: string;
}

export interface IThesisUpdateParam {
  course: string; // khoá đào tạo
  name_student: string;
  num_decision: string;
  num_year: number;
  num_person: number;
  type: number;
  type_thesis: number;
  role: string;
}

export interface IThesisSearchParam extends ICommonSearchOption, ICommonSortOption {
  course?: string; // khoá đào tạo
  name_student?: string;
  num_decision?: string;
  num_person?: number;
  search?: string;
}