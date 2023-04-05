import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeExam } from './_common';

export interface IExamMainAttr {
    user_id: number;
    name: string;
    code: string;
    form_exam: string;
    number_question: number;
    time_work: number;
    type: TypeExam
}

export interface IExamAttr extends IExamMainAttr, ICommonAttr { }

export interface IExamCreateParam {
    user_id: number;
    name: string;
    code: string;
    form_exam: string;
    number_question: number;
    time_work: number;
    type: TypeExam
}

export interface IExamUpdateParam {
    user_id: number;
    name: string;
    code: string;
    form_exam: string;
    number_question: number;
    time_work: number;
    type: TypeExam
}

export interface IExamSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    form_exam?: string;
    number_question?: number;
    time_work?: number;
    type?: TypeExam
    search?: string;
}