import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface IInventionMainAttr {
    name: string;
    code: string;
    level: number;
    num_person: number;
    total_time: number;
    date_recognition: Date;
    number_recognition: string;
    year_id: number;
}

export interface IInventionAttr extends IInventionMainAttr, ICommonAttr { }

export interface IInventionCreateParam {
    name: string;
    code: string;
    role: string;
    type: number;
    level: number;
    num_person: number;
    total_time: number;
    date_recognition: Date;
    number_recognition: string;
    year_id?: number;
}

export interface IInventionUpdateParam {
    name: string;
    code: string;
    level: number;
    role: string;
    type: number;
    num_person: number;
    total_time: number;
    date_recognition: Date;
    number_recognition: string;
    year_id?: number;
}

export interface IInventionSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    search?: string;
}