import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeExam } from './_common';

export interface IExamMainAttr {
    user_id: number;
    // semester_id: number;
    subject_id: number;
    name: string;
    code: string;
    factor: number; // hệ số
    type: number;
    num_question: number; // số đề / số câu trắc nghiệm
}

export interface IExamAttr extends IExamMainAttr, ICommonAttr { }

export interface IExamCreateParam {
    user_id: number;
    // semester_id?: number;
    subject_id: number;
    name?: string;
    code?: string;
    factor?: number; // hệ số
    type?: number;
    num_question?: number; 
}

export interface IExamUpdateParam {
    user_id?: number;
    // semester_id?: number;
    subject_id?: number;
    name?: string;
    code?: string;
    factor?: number; // hệ số
    type?: number;
    num_question?: number; 
}

export interface IExamSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    factor?: number; // hệ số
    type?: number
    search?: string;
}