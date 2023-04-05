import { Request } from "express";
import { types } from "../../common";
import { pickForSearch } from "../../utils";

export const searchData = (req: Request) => {
  return pickForSearch(<types.user.UserSearchParam>req.query, [
    'name',
    'search',
    'sort',
    'sortColumn',
  ]);
};