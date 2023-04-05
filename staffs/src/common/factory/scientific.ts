import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface IScientificMainAttr {
    name: string;
    code: string;
    num_decision: string;
    total_time: number;
    result_level: number;
    date_decision: Date;
}

export interface IScientificAttr extends IScientificMainAttr, ICommonAttr { }

export interface IScientificCreateParam {
    name: string;
    code: string;
    num_decision: string;
    total_time: number;
    result_level: number;
    date_decision: Date;
}

export interface IScientificUpdateParam {
    name: string;
    code: string;
    num_decision: string;
    total_time: number;
    result_level: number;
    date_decision: Date;
}

export interface IScientificSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    search?: string;
}