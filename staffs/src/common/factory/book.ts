import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface IBookMainAttr {
    name: string;
    code: string;
    num_person: number;
    num_publish: string;
    num_page: number;
    total_time: number;
}

export interface IBookAttr extends IBookMainAttr, ICommonAttr { }

export interface IBookCreateParam {
    name: string;
    code: string;
    num_person: number;
    num_publish: string;
    num_page: number;
    total_time: number;
}

export interface IBookUpdateParam {
    name: string;
    code: string;
    num_person: number;
    num_publish: string;
    num_page: number;
    total_time: number;
}

export interface IBookSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    search?: string;
}