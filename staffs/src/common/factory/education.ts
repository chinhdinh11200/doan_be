import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IEducationMainAttr {
    name: string;
    code: string;
    num_credit: number;
    total_time: number;
    num_person: number;
    form_construction: number;
    num_decision: string;
    date_decision: Date;
    year_id: number;
}

export interface IEducationAttr extends IEducationMainAttr, ICommonAttr { }

export interface IEducationCreateParam {
    name: string;
    code: string;
    role: string;
    num_credit: number;
    total_time: number;
    num_person: number;
    form_construction: number;
    type: number;
    num_decision: string;
    date_decision: Date;
    year_id?: number;
}

export interface IEducationUpdateParam {
    name: string;
    code: string;
    role: string;
    num_credit: number;
    total_time: number;
    num_person: number;
    form_construction: number;
    type: number;
    num_decision: string;
    date_decision: Date;
    year_id?: number;
}

export interface IEducationSearchParam  extends ICommonSearchOption, ICommonSortOption{
    name?: string;
    code?: string;
    search?: string;
}