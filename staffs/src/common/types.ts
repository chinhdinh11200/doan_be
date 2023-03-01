import * as userFactory from './factory/user';
import * as departmentFactory from './factory/department';
import * as tokenFactory from './factory/token';
import * as classFactory from './factory/class';
import * as subjectFactory from './factory/subject';
import * as timeFactory from './factory/time';

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

export namespace classes {
  export import Attr = classFactory.IClassAttr;
  export import ClassCreateParam = classFactory.IClassCreateParam;
  export import ClassUpdateParam = classFactory.IClassUpdateParam;
}

export namespace subject {
  export import Attr = subjectFactory.ISubjectAttr;
  export import SubjectCreateParam = subjectFactory.ISubjectCreateParam;
  export import SubjectUpdateParam = subjectFactory.ISubjectUpdateParam;
  export import SubjectSearchParam = subjectFactory.ISubjectSearchParam;
}

export namespace time {
  export import Attr = timeFactory.ITimeAttr;
  export import TimeCreateParam = timeFactory.ITimeCreateParam;
  export import TimeUpdateParam = timeFactory.ITimeUpdateParam;
}