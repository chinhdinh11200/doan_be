import { DB } from '../../models/index';
import { NextFunction, Request, Response } from 'express';
import Controller from './base';
import User from '../../models/user';
import * as repository from '../../repo';
import { types } from '../../common';

export default class UserController extends Controller {
  private userRepo: repository.User;
  private model: DB['User'];

  constructor(db: DB) {
    super(db);
    this.userRepo = new repository.User(db);
    this.model = db.User;
  }

  public search = async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.model.findAll();

    res.send(users);
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = await this.userRepo.findOneById(req.params.id);

    res.send(user);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const data: types.user.UserCreateParam = {
      department_id: req.body.department_id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      code: req.body.code,
      birthday: req.body.birthday,
      degree: req.body.degree,
      position: req.body.position,
      income: req.body.income,
      number_salary: req.body.number_salary,
    };

    const user = await this.userRepo.create(data);

    res.json(user);
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const data: types.user.UserUpdateParam = {
      department_id: req.body.department_id,
      name: req.body.name,
      email: req.body.email,
      code: req.body.code,
      birthday: req.body.birthday,
      degree: req.body.degree,
      position: req.body.position,
      income: req.body.income,
      number_salary: req.body.number_salary,
      time_per_year: req.body.time_per_year,
      time_reserve: req.body.time_reserve,
    };
    const userId = req.params.id;
    const user = await this.userRepo.update(userId, data);

    res.json(user);
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const user = await this.userRepo.delete(userId);

    res.json(user);
  };
}
