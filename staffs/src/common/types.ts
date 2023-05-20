import * as userFactory from './factory/user';
import * as departmentFactory from './factory/department';
import * as tokenFactory from './factory/token';
import * as classFactory from './factory/class';
import * as subjectFactory from './factory/subject';
import * as timeFactory from './factory/time';
import * as markFactory from './factory/mark';
import * as examFactory from './factory/exam';
import * as roomFactory from './factory/room';
import * as roleFactory from './factory/role';
import * as topicFactory from './factory/topic';
import * as articleFactory from './factory/article';
import * as inventionFactory from './factory/invention';
import * as compilationFactory from './factory/compilation';
import * as bookFactory from './factory/book';
import * as scientificFactory from './factory/scientific';
import * as educationFactory from './factory/education';
import * as thesisFactory from './factory/thesis';
import * as yearFactory from './factory/year';
import * as authFactory from './factory/auth';

export namespace auth {
  export import UserInfo = authFactory.IUserInfo;
}

export namespace user {
  export import Attr = userFactory.IUserAttr;
  export import UserCreateParam = userFactory.IUserCreateParam;
  export import UserUpdateParam = userFactory.IUserUpdateParam;
  export import UserLoginParam = userFactory.IUserLoginParam;
  export import UserSearchParam = userFactory.IUserSearchParam;
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

export namespace role {
  export import Attr = roleFactory.IRoleAttr;
  export import RoleCreateParam = roleFactory.IRoleCreateParam;
  export import RoleUpdateParam = roleFactory.IRoleUpdateParam;
  export import RoleSearchParam = roleFactory.IRoleSearchParam;
}

export namespace topic {
  export import Attr = topicFactory.ITopicAttr;
  export import TopicCreateParam = topicFactory.ITopicCreateParam;
  export import TopicUpdateParam = topicFactory.ITopicUpdateParam;
  export import TopicSearchParam = topicFactory.ITopicSearchParam;
}

export namespace article {
  export import Attr = articleFactory.IArticleAttr;
  export import ArticleCreateParam = articleFactory.IArticleCreateParam;
  export import ArticleUpdateParam = articleFactory.IArticleUpdateParam;
  export import ArticleSearchParam = articleFactory.IArticleSearchParam;
}

export namespace invention {
  export import Attr = inventionFactory.IInventionAttr;
  export import InventionCreateParam = inventionFactory.IInventionCreateParam;
  export import InventionUpdateParam = inventionFactory.IInventionUpdateParam;
  export import InventionSearchParam = inventionFactory.IInventionSearchParam;
}

export namespace book {
  export import Attr = bookFactory.IBookAttr;
  export import BookCreateParam = bookFactory.IBookCreateParam;
  export import BookUpdateParam = bookFactory.IBookUpdateParam;
  export import BookSearchParam = bookFactory.IBookSearchParam;
}

export namespace scientific {
  export import Attr = scientificFactory.IScientificAttr;
  export import ScientificCreateParam = scientificFactory.IScientificCreateParam;
  export import ScientificUpdateParam = scientificFactory.IScientificUpdateParam;
  export import ScientificSearchParam = scientificFactory.IScientificSearchParam;
}

export namespace compilation {
  export import Attr = compilationFactory.ICompilationAttr;
  export import CompilationCreateParam = compilationFactory.ICompilationCreateParam;
  export import CompilationUpdateParam = compilationFactory.ICompilationUpdateParam;
  export import CompilationSearchParam = compilationFactory.ICompilationSearchParam;
}

export namespace education {
  export import Attr = educationFactory.IEducationAttr;
  export import EducationCreateParam = educationFactory.IEducationCreateParam;
  export import EducationUpdateParam = educationFactory.IEducationUpdateParam;
  export import EducationSearchParam = educationFactory.IEducationSearchParam;
}

export namespace thesis {
  export import Attr = thesisFactory.IThesisAttr;
  export import ThesisCreateParam = thesisFactory.IThesisCreateParam;
  export import ThesisUpdateParam = thesisFactory.IThesisUpdateParam;
  export import ThesisSearchParam = thesisFactory.IThesisSearchParam;
}

export namespace year {
  export import Attr = yearFactory.IYearAttr;
  export import YearCreateParam = yearFactory.IYearCreateParam;
  export import YearUpdateParam = yearFactory.IYearUpdateParam;
  export import YearSearchParam = yearFactory.IYearSearchParam;
}