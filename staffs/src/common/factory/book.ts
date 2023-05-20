import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface IBookMainAttr {
    name: string;
    code: string;
    num_person: number;
    num_publish: string;
    num_page: number;
    total_time: number;
    year_id: number;
}

export interface IBookAttr extends IBookMainAttr, ICommonAttr { }

export interface IBookCreateParam {
    name: string;
    code: string;
    role: string;
    num_person: number;
    num_publish: string;
    num_page: number;
    total_time: number;
    type_book: number;
    type: number;
    year_id?: number;
}

export interface IBookUpdateParam {
    name: string;
    code: string;
    role: string;
    num_person: number;
    num_publish: string;
    num_page: number;
    total_time: number;
    type_book: number;
    type: number;
    year_id?: number;
}

export interface IBookSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    search?: string;
}