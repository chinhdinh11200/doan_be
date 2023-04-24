import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeExam } from './_common';

export interface IExamMainAttr {
    user_id: number;
    semester_id: number;
    subject_id: number;
    name: string;
    code: string;
    form_exam: string;
    number_quizzes: number;
    number_question: number;
    num_code: number;
    time_work: number;
    marking: number;
    exam_create: number;
    exam_supervision: number;
    num_student: number;
    type: number
}

export interface IExamAttr extends IExamMainAttr, ICommonAttr { }

export interface IExamCreateParam {
    user_id: number;
    semester_id: number;
    subject_id: number;
    name: string;
    code: string;
    form_exam: string;
    number_question: number;
    number_quizzes?: number;
    num_code: number;
    time_work: number;
    marking?: number;
    exam_create?: number;
    exam_supervision?: number;
    num_student?: number;
    type: number
}

export interface IExamUpdateParam {
    user_id: number;
    semester_id: number;
    subject_id: number;
    name: string;
    code: string;
    form_exam: string;
    number_question: number;
    number_quizzes?: number;
    num_code: number;
    time_work: number;
    marking?: number;
    exam_create?: number;
    exam_supervision?: number;
    num_student?: number;
    type: number
}

export interface IExamSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    form_exam?: string;
    number_question?: number;
    time_work?: number;
    type?: number
    search?: string;
}