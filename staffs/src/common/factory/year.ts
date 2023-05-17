import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IYearMainAttr {
  name: string;
  startDate: Date;
  endDate: Date;
  semester: string;
}

export interface IYearAttr extends IYearMainAttr, ICommonAttr { }

export interface IYearCreateParam {
  name: string;
  startDate: Date;
  endDate: Date;
  semester: string;
}

export interface IYearUpdateParam {
  name: string;
  startDate: Date;
  endDate: Date;
  semester: string;
}

export interface IYearSearchParam extends ICommonSearchOption, ICommonSortOption {
  name?: string;
  search?: string;
}