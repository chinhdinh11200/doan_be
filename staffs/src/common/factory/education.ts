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
}

export interface IEducationAttr extends IEducationMainAttr, ICommonAttr { }

export interface IEducationCreateParam {
    name: string;
    code: string;
    num_credit: number;
    total_time: number;
    num_person: number;
    form_construction: number;
    num_decision: string;
    date_decision: Date;
}

export interface IEducationUpdateParam {
    name: string;
    code: string;
    num_credit: number;
    total_time: number;
    num_person: number;
    form_construction: number;
    num_decision: string;
    date_decision: Date;
}

export interface IEducationSearchParam  extends ICommonSearchOption, ICommonSortOption{
    name?: string;
    code?: string;
    search?: string;
}