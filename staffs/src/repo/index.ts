import { AuthRepository } from './auth';
import DepartmentRepository from './department';
import UserRepository from './user';
import SubjectRepository from './subject';
import ClassRepository from './class';
import MarkRepository from './mark';
import ExamRepository from './exam';
import RoomRepository from './room';
import RoleRepository from './role';
import TopicRepository from './topic';
import ArticleRepository from './article';
import InventionRepository from './invention';
import BookRepository from './book';
import EducationRepository from './education';
import ScientificRepository from './scientific';
import CompilationRepository from './compilation';
import TimeRepository from './time';
import ExportRepository from './export';
import ImportRepository from './import';

export class Department extends DepartmentRepository {}
export class User extends UserRepository {}
export class Auth extends AuthRepository {}
export class Subject extends SubjectRepository {}
export class Classes extends ClassRepository {}
export class Mark extends MarkRepository {}
export class Exam extends ExamRepository {}
export class Room extends RoomRepository {}
export class Topic extends TopicRepository {}
export class Article extends ArticleRepository {}
export class Book extends BookRepository {}
export class Invention extends InventionRepository {}
export class Compilation extends CompilationRepository {}
export class Scientific extends ScientificRepository {}
export class Education extends EducationRepository {}
export class Role extends RoleRepository {}
export class Time extends TimeRepository {}
export class Export extends ExportRepository {}
export class Import extends ImportRepository {}
