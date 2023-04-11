import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IRoomMainAttr {
    exam_id: number;
    semester_id: number;
    name: string;
    code: string;
    num_student: number;
    startDate: string;
    endDate: string;
}

export interface IRoomAttr extends IRoomMainAttr, ICommonAttr { }

export interface IRoomCreateParam {
    exam_id: number;
    semester_id: number;
    name: string;
    code: string;
    num_student: number;
    startDate: string;
    endDate: string;
}

export interface IRoomUpdateParam {
    exam_id: number;
    semester_id: number;
    name: string;
    code: string;
    num_student: number;
    startDate: string;
    endDate: string;
}

export interface IRoomSearchParam extends ICommonSearchOption, ICommonSortOption{
    exam_id?: number;
    name?: string;
    code?: string;
    num_student?: number;
    startDate?: string;
    endDate?: string;
    semester?: string;
    search?: string;
}