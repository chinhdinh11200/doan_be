import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IUserMainAttr {
  department_id: number;
  name: string;
  email: string;
  password: string;
  salt: string;
  code: string;
  birthday: Date;
  position: string;
  avatar?: string;
  degree: string;
  number_salary: number;
  income: number;
  time_per_year: number;
  time_reserve: number;
}

export interface IUserAttr extends IUserMainAttr, ICommonAttr { }

export interface IUserCreateParam {
  department_id?: number;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  code: string;
  birthday?: Date;
  position: string;
  degree: string;
  number_salary: number;
  income: number;
  time_per_year?: number;
}

export interface IUserUpdateParam {
  department_id?: number;
  name: string;
  email: string;
  avatar?: string;
  code: string;
  birthday?: Date;
  position: string;
  degree: string;
  number_salary: number;
  income: number;
  time_per_year: number;
  time_reserve: number;
}

export interface IUserLoginParam {
  username: string;
  password: string;
}

export interface IChangePasswordParam {
  email: string,
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUserSearchParam extends ICommonSearchOption, ICommonSortOption{
  name?: string;
  email?: string;
  search?: string;
}