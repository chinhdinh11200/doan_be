import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IRoomMainAttr {
    subject_id: number;
    user_id: number;
    // semester_id: number;
    time: number; // thời gian làm bài
    type: number; // hình thức coi làm bài
    factor: number; // hệ số
    num_exam_session: number; // số ca thi coi môn này
    name: string;
    code: string;
    num_student: number;
    startDate: string;
    endDate: string;
    semester: number;
}

export interface IRoomAttr extends IRoomMainAttr, ICommonAttr { }

export interface IRoomCreateParam {
    subject_id: number;
    user_id: number;
    // semester_id: number;
    time?: number;
    type?: number; // hình thức coi làm bài
    factor?: number; // hệ số
    num_exam_session?: number;
    name?: string;
    code?: string;
    num_student?: number;
    startDate?: string;
    endDate?: string;
    semester: number;
}

export interface IRoomUpdateParam {
    subject_id?: number;
    user_id: number;
    // semester_id?: number;
    time?: number;
    type?: number; // hình thức coi làm bài
    factor?: number; // hệ số
    name?: string;
    num_exam_session?: number;
    code?: string;
    num_student?: number;
    startDate?: string;
    endDate?: string;
    semester: number;
}

export interface IRoomSearchParam extends ICommonSearchOption, ICommonSortOption {
    exam_id?: number;
    name?: string;
    code?: string;
    num_student?: number;
    startDate?: string;
    endDate?: string;
    semester?: string;
    search?: string;
}