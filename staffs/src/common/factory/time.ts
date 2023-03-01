import { ICommonAttr, ICommonSearchOption } from './_common';

export interface ITimeMainAttr {
  name: string;
}

export interface ITimeAttr extends ITimeMainAttr, ICommonAttr {}

export interface ITimeCreateParam {
  name: string;
}

export interface ITimeUpdateParam {
  name: string;
}