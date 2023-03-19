import { ICommonAttr, ICommonSearchOption } from './_common';

export interface IRoomMainAttr {
    exam_id: number;
    name: string;
    code: string;
    num_student: number;
    startDate: string;
    endDate: string;
    semester: string;
}

export interface IRoomAttr extends IRoomMainAttr, ICommonAttr { }

export interface IRoomCreateParam {
    exam_id: number;
    name: string;
    code: string;
    num_student: number;
    startDate: string;
    endDate: string;
    semester: string;
}

export interface IRoomUpdateParam {
    exam_id: number;
    name: string;
    code: string;
    num_student: number;
    startDate: string;
    endDate: string;
    semester: string;
}

export interface IRoomSearchParam {
    exam_id: number;
    name: string;
    code: string;
    num_student: number;
    startDate: string;
    endDate: string;
    semester: string;
    search: string;
}