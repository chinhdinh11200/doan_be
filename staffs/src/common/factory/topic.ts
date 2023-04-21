import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface ITopicMainAttr {
    name: string;
    code: string;
    level: number;
    endDate: Date;
    startDate: Date;
    acceptDate: Date;
    result: number;
    num_person: number;
    total_time: number;
}

export interface ITopicAttr extends ITopicMainAttr, ICommonAttr { }

export interface ITopicCreateParam {
    name: string;
    code: string;
    role: string;
    level: number;
    endDate: Date;
    startDate: Date;
    acceptDate: Date;
    result: number;
    num_person: number;
    total_time: number;
    type: number,
}

export interface ITopicUpdateParam {
    name: string;
    code: string;
    role: string;
    level: number;
    endDate: Date;
    startDate: Date;
    acceptDate: Date;
    result: number;
    num_person: number;
    total_time: number;
    type: number;
}

export interface ITopicSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    search?: string;
}