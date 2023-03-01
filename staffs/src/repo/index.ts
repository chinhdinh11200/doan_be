import { AuthRepository } from './auth';
import DepartmentRepository from './department';
import UserRepository from './user';
import SubjectRepository from './subject';

export class Department extends DepartmentRepository {}
export class User extends UserRepository {}
export class Auth extends AuthRepository {}
export class Subject extends SubjectRepository {}
