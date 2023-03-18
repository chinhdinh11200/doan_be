import { ICommonAttr, ICommonSearchOption } from './_common';

export interface IMarkMainAttr {
    exam_id: number;
    time_mark: number;
    form_mark: number;
}

export interface IMarkAttr extends IMarkMainAttr, ICommonAttr { }

export interface IMarkCreateParam {
    time_mark: number;
    form_mark: number;
}

export interface IMarkUpdateParam {
    time_mark: number;
    form_mark: number;
}

export interface IMarkSearchParam {
    time_mark: number;
    form_mark: number;
}