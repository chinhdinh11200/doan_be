import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class SubjectController extends Controller {
  private readonly subjectRepo: repository.Subject;
  constructor(db: DB) {
    super(db);

    this.subjectRepo = new repository.Subject(db);
  }

  public search = async (req: Request, res: Response, next: NextFunction) => {
    const params: types.subject.SubjectSearchParam = {
      ...pickForSearch(<types.subject.SubjectSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
      ...this.getOffsetLimit(req),
    }
    const data = await this.subjectRepo.search(params);

    this.ok(res, data)
  }

  public detail =async (req:Request, res: Response, next: NextFunction) => {
    const subject = await this.subjectRepo.findById(req.params.id);

    res.json(subject);
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const params: types.subject.SubjectCreateParam = {
      name: req.body.name,
      code: req.body.code,
      form_exam: req.body.form_exam,
    }
    const data = await this.subjectRepo.create(params);

    this.created(res, data.dataValues);
  }
  public update = async (req: Request, res: Response, next: NextFunction) => {
    
    const params: types.subject.SubjectUpdateParam = {
      name: req.body.name,
      code: req.body.code,
      form_exam: req.body.form_exam,
    }

    const data = await this.subjectRepo.update(params, req.params.id);

    this.created(res, data);
  }
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const subject = await this.subjectRepo.delete(req.params.id);

    res.status(OK).json(subject)
  }
}
