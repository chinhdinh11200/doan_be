import { ICommonAttr, ICommonSearchOption, ICommonSortOption } from './_common';

export interface IMarkMainAttr {
    subject_id: number;
    user_id: number;
    type: number; // hình thức chấm tự luận trắc nghiệm .....
    num_exam: number, // số bài thi/ số sinh viên được chấm
    factor: number, // hế ố nhân bao nhieeu
    date_exam: Date;
    form_mark: number;
}

export interface IMarkAttr extends IMarkMainAttr, ICommonAttr { }

export interface IMarkCreateParam {
    subject_id: number;
    user_id: number;
    type?: number;
    num_exam?: number;
    factor?: number, // hế ố nhân bao nhieeu
    date_exam?: Date;
    form_mark?: number;
}

export interface IMarkUpdateParam {
    subject_id?: number;
    user_id?: number;
    type?: number;
    num_exam?: number;
    factor?: number, // hế ố nhân bao nhieeu
    date_exam?: Date;
    form_mark?: number;
}

export interface IMarkSearchParam extends ICommonSearchOption, ICommonSortOption {
    subject_id?: number;
    user_id?: number;
    type?: number;
    num_exam?: number;
    factor?: number, // hế ố nhân bao nhieeu
    date_exam?: Date;
    form_mark?: number;
    search?: string;
}