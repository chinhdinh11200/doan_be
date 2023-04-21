import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface ICompilationMainAttr {
    name: string;
    code: string;
    num_person: number;
    total_time: number;
    date_decision: Date;
    num_decision: string;
    number_credit: number;
}

export interface ICompilationAttr extends ICompilationMainAttr, ICommonAttr { }

export interface ICompilationCreateParam {
    name: string;
    code: string;
    role: string;
    num_person: number;
    total_time: number;
    date_decision: Date;
    num_decision: string;
    number_credit: number;
    type: number;
}

export interface ICompilationUpdateParam {
    name: string;
    code: string;
    role: string;
    num_person: number;
    total_time: number;
    date_decision: Date;
    num_decision?: string;
    number_credit: number;
    type: number;
}

export interface ICompilationSearchParam extends ICommonSearchOption, ICommonSortOption{
    name?: string;
    code?: string;
    search?: string;
}