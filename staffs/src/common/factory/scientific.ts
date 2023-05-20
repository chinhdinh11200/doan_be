import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface IScientificMainAttr {
    name: string;
    code: string;
    type: number;
    num_person: number;
    total_time: number;
    result_level: number;
    result_academy: number;
    date_decision: Date;
    year_id: number;
}

export interface IScientificAttr extends IScientificMainAttr, ICommonAttr { }

export interface IScientificCreateParam {
    name: string;
    code: string;
    role: string;
    type: number;
    typeScientific: number;
    num_decision: string;
    total_time: number;
    result_level?: number;
    result_academy?: number;
    date_decision: Date;
    year_id?: number;
}

export interface IScientificUpdateParam {
    name: string;
    code: string;
    role: string;
    type: number;
    typeScientific: number;
    num_decision: string;
    total_time: number;
    result_level: number;
    result_academy: number;
    date_decision: Date;
    year_id?: number;
}

export interface IScientificSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    search?: string;
}