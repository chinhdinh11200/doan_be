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

export interface ICommonSortOption {
  sort?: string;
  sortColumn?: string;
}

export enum TypeExam {
  middle = 0,
  end = 1,
}

export enum TypeScientific {
  middle = 0,
  end = 1,
}

export enum TypeRoleUser {
  main = 0,
  support = 1,
  member = 2,
}

export enum TotalTime {
  topic = 800,
}

