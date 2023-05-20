import { IUserMainAttr } from "./user";

export interface IUserInfo extends IUserMainAttr {
  id: number;
  name: string;
  email: string;
  role: number;
  position: string;
  accessToken?: string;
  refreshToken?: string;
}