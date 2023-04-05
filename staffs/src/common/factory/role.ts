import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface IRoleMainAttr {
    name: string;
    time: string;
    type: TypeScientific;
}

export interface IRoleAttr extends IRoleMainAttr, ICommonAttr { }

export interface IRoleCreateParam {
    name: string;
    time: string;
    type: TypeScientific;
}

export interface IRoleUpdateParam {
    name: string;
    time: string;
    type: TypeScientific;
}

export interface IRoleSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    time?: string;
    type?: TypeScientific;
    search?: string;
}