import * as userFactory from './factory/user';
import * as departmentFactory from './factory/department';
import * as tokenFactory from './factory/token';

export namespace user {
  export import Attr = userFactory.IUserAttr;
  export import UserCreateParam = userFactory.IUserCreateParam;
  export import UserUpdateParam = userFactory.IUserUpdateParam;
  export import UserLoginParam = userFactory.IUserLoginParam;
  export import ChangePasswordParam = userFactory.IChangePasswordParam;
}

export namespace department {
  export import Attr = departmentFactory.IDepartmentAttr;
  export import DepartmentCreateParam = departmentFactory.IDepartmentCreateParam;
  export import DepartmentUpdateParam = departmentFactory.IDepartmentUpdateParam;
  export import DepartmentSearchParam = departmentFactory.IDepartmentSearchParam;
}

export namespace token {
  export import Attr = tokenFactory.ITokenAttr;
  export import TokenCreateParam = tokenFactory.ITokenCreateParam;
}
