import {ICommonAttr, ICommonSearchOption, ICommonSortOption} from './_common';

export interface IDepartmentMainAttr {
  name: string;
  code: string;
}

export interface IDepartmentAttr extends IDepartmentMainAttr, ICommonAttr {};

export interface IDepartmentCreateParam {
  name: string;
  code: string;
}

export interface IDepartmentUpdateParam {
  name: string;
  code: string;
}

export interface IDepartmentSearchParam extends ICommonSearchOption, ICommonSortOption {
  name?: string;
  code?: string;
  search?: string;
}
