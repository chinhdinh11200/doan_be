import {ICommonAttr, ICommonSearchOption, ICommonSortOption} from './_common';

export interface IDepartmentMainAttr {
  name: string;
  code: string;
  parent_id: number
}

export interface IDepartmentAttr extends IDepartmentMainAttr, ICommonAttr {};

export interface IDepartmentCreateParam {
  name: string;
  code: string;
  parent_id: number
}

export interface IDepartmentUpdateParam {
  name: string;
  code: string;
  parent_id: number
}

export interface IDepartmentSearchParam extends ICommonSearchOption, ICommonSortOption {
  name?: string;
  code?: string;
  parent_id?: number
  search?: string;
}
