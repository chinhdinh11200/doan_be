import * as userFactory from './factory/user';
import * as departmentFactory from './factory/department';
import * as tokenFactory from './factory/token';
import * as classFactory from './factory/class';
import * as subjectFactory from './factory/subject';
import * as timeFactory from './factory/time';
import * as markFactory from './factory/mark';
import * as examFactory from './factory/exam';
import * as roomFactory from './factory/room';

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
  export import ClassSearchParam = classFactory.IClassSearchParam;
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

export namespace exam {
  export import Attr = examFactory.IExamAttr;
  export import ExamCreateParam = examFactory.IExamCreateParam;
  export import ExamUpdateParam = examFactory.IExamUpdateParam;
  export import ExamSearchParam = examFactory.IExamSearchParam;
}

export namespace mark {
  export import Attr = markFactory.IMarkAttr;
  export import MarkCreateParam = markFactory.IMarkCreateParam;
  export import MarkUpdateParam = markFactory.IMarkUpdateParam;
  export import MarkSearchParam = markFactory.IMarkSearchParam;
}

export namespace room {
  export import Attr = roomFactory.IRoomAttr;
  export import RoomCreateParam = roomFactory.IRoomCreateParam;
  export import RoomUpdateParam = roomFactory.IRoomUpdateParam;
  export import RoomSearchParam = roomFactory.IRoomSearchParam;
}