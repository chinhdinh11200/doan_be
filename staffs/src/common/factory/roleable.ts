import { ICommonAttr, TypeScientific } from './_common';

export interface IRoleAbleMainAttr {
    role_able_id: number;
    role_id: number
    time: string;
    type: TypeScientific;
}

export interface IRoleAbleAttr extends IRoleAbleMainAttr, ICommonAttr { }

export interface IRoleAbleCreateParam {
    role_able_id: number;
    role_id: number
    time: string;
    type: TypeScientific;
}

export interface IRoleAbleUpdateParam {
    role_able_id: number;
    role_id: number
    time: string;
    type: TypeScientific;
}

export interface IRoleAbleSearchParam {
    role_able_id: number;
    role_id: number
    time: string;
    type: TypeScientific;
}