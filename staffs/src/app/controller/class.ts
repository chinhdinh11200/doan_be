import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class classesController extends Controller {
  private readonly classRepo: repository.Classes;
  constructor(db: DB) {
    super(db);

    this.classRepo = new repository.Classes(db);
  }

  public search = async (req: Request, res: Response, next: NextFunction) => {
    const params: types.classes.ClassSearchParam = {
      ...pickForSearch(<types.classes.ClassSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
      ...this.getOffsetLimit(req),
    }

    const classes = await this.classRepo.search(params);

    res.status(OK).json(classes);

  }
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const params: types.classes.ClassCreateParam = {
      subject_id: req.body.subject_id,
      user_id: req.body.user_id,
      parent_id: req.body.parent_id,
      name: req.body.name,
      code: req.body.code,
      form_teach: req.body.form_teach,
      num_student: req.body.num_student,
      classroom: req.body.classroom,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      level_teach: req.body.level_teach,
      time_teach: req.body.time_teach,
      semester: req.body.semester,
    }

    const classes = await this.classRepo.create(params);

    res.status(OK).json(classes);
  }
  public update = async (req: Request, res: Response, next: NextFunction) => {

    const params: types.classes.ClassUpdateParam = {
      subject_id: req.body.subject_id,
      user_id: req.body.user_id,
      parent_id: req.body.parent_id,
      name: req.body.name,
      code: req.body.code,
      form_teach: req.body.form_teach,
      num_student: req.body.num_student,
      classroom: req.body.classroom,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      level_teach: req.body.level_teach,
      time_teach: req.body.time_teach,
      semester: req.body.semester,
    }

    const classes = await this.classRepo.update(params, req.params.id);

    res.status(OK).json(classes);

  }
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const classes = await this.classRepo.delete(req.params.id);

    res.status(OK).json(classes)
  }
}
