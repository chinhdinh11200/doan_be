import { ICommonAttr, TypeScientific } from './_common';

export interface ITopicMainAttr {
    name: string;
    code: string;
    level: number;
    endDate: Date;
    result: number;
    num_person: number;
    total_time: number;
}

export interface ITopicAttr extends ITopicMainAttr, ICommonAttr { }

export interface ITopicCreateParam {
    name: string;
    code: string;
    level: number;
    endDate: Date;
    result: number;
    num_person: number;
    total_time: number;
}

export interface ITopicUpdateParam {
    name: string;
    code: string;
    level: number;
    endDate: Date;
    result: number;
    num_person: number;
    total_time: number;
}

export interface ITopicSearchParam {
    name: string;
    code: string;
    search: string;
}