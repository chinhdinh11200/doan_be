import { AuthRepository } from './auth';
import DepartmentRepository from './department';
import UserRepository from './user';
import SubjectRepository from './subject';
import ClassRepository from './class';

export class Department extends DepartmentRepository {}
export class User extends UserRepository {}
export class Auth extends AuthRepository {}
export class Subject extends SubjectRepository {}
export class Classes extends ClassRepository {}
