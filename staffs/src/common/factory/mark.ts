import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IMarkMainAttr {
    exam_id: number;
    time_mark: number;
    form_mark: number;
}

export interface IMarkAttr extends IMarkMainAttr, ICommonAttr { }

export interface IMarkCreateParam {
    time_mark: number;
    form_mark: number;
    exam_id: number;
}

export interface IMarkUpdateParam {
    time_mark: number;
    form_mark: number;
    exam_id: number;
}

export interface IMarkSearchParam extends ICommonSearchOption, ICommonSortOption {
    time_mark?: number;
    form_mark?: number;
    exam_id?: number;
    search?: string;
}