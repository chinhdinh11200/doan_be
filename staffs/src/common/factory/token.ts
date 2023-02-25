export interface ITokenMainAttr {
  id: number;
  email: string;
  token: string;
  createdAt: Date;
}

export interface ITokenAttr extends ITokenMainAttr {}

export interface ITokenCreateParam {
  email: string;
  token: string;
}
