import { AuthRepository } from './auth';
import DepartmentRepository from './department';
import UserRepository from './user';
import SubjectRepository from './subject';
import ClassRepository from './class';
import MarkRepository from './mark';
import ExamRepository from './exam';
import RoomRepository from './room';

export class Department extends DepartmentRepository {}
export class User extends UserRepository {}
export class Auth extends AuthRepository {}
export class Subject extends SubjectRepository {}
export class Classes extends ClassRepository {}
export class Mark extends MarkRepository {}
export class Exam extends ExamRepository {}
export class Room extends RoomRepository {}
