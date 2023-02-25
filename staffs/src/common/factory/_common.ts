export interface ICommonAttr {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ICommonSearchOption {
  limit?: number | string;
  offset?: number | string;
}
