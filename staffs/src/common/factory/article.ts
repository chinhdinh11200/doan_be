import { ICommonAttr, ICommonSearchOption, ICommonSortOption, TypeScientific } from './_common';

export interface IArticleMainAttr {
    name: string;
    code: string;
    type: number;
    index_article: number;
    open_access: number;
    open_access_scopus: number;
    total_time: number;
    num_person: number;
    year_id: number;
}

export interface IArticleAttr extends IArticleMainAttr, ICommonAttr { }

export interface IArticleCreateParam {
    name: string;
    code: string;
    role: string;
    type: number;
    type_article: number;
    open_access?: number;
    open_access_scopus?: number;
    index_article: number;
    total_time: number;
    num_person: number;
    year_id?: number;
}

export interface IArticleUpdateParam {
    name: string;
    code: string;
    role: string;
    type: number;
    type_article: number;
    open_access?: number;
    open_access_scopus?: number;
    index_article: number;
    total_time: number;
    num_person: number;
    year_id?: number;
}

export interface IArticleSearchParam extends ICommonSearchOption, ICommonSortOption {
    name?: string;
    code?: string;
    search?: string;
}