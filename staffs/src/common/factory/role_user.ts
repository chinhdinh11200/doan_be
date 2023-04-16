import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeRoleUser } from './_common';

export interface IRoleAbleMainAttr {
  user_id: number;
  role_id: number
  time: string;
  type: TypeRoleUser;
}

export interface IRoleAbleAttr extends IRoleAbleMainAttr, ICommonAttr { }

export interface IRoleAbleCreateParam {
  user_id: number;
  role_id: number
  time: string;
  type: TypeRoleUser;
}

export interface IRoleAbleUpdateParam {
  user_id: number;
  role_id: number
  time: string;
  type: TypeRoleUser;
}

export interface IRoleAbleSearchParam extends ICommonSearchOption, ICommonSortOption {
  user_id: number;
  role_id: number
  time: string;
  type: TypeRoleUser;
  search: string;
}