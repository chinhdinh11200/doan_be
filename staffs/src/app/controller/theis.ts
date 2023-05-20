import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class ArticleController extends Controller {
  private readonly thesisRepo: repository.Thesis;
  constructor(db: DB) {
    super(db);

    this.thesisRepo = new repository.Thesis(db);
  }

  public detail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.thesisRepo.detail(req.params.id);

    res.json(user)
  }

  public search = async (req: Request, res: Response, next: NextFunction) => {
    const params: types.thesis.ThesisSearchParam = {
      ...pickForSearch(<types.thesis.ThesisSearchParam>req.query, ['course', 'name_student', 'search', 'sort', 'sortColumn']),
      ...this.getOffsetLimit(req),
    }
    
    const data = await this.thesisRepo.search(params);

    this.ok(res, data);

  }
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const params: types.thesis.ThesisCreateParam = {
      name_student: req.body.name_student,
      course: req.body.course,
      num_decision: req.body.num_decision,
      num_year: req.body.num_year,
      num_person: req.body.num_person,
      type_thesis: req.body.type_thesis,
      role: req.body.role,
      type: req.body.type,
      year_id: req.body.year_id,
    }
    const data = await this.thesisRepo.create(params);

    this.created(res, data);
  }
  public update = async (req: Request, res: Response, next: NextFunction) => {

    const params: types.thesis.ThesisUpdateParam = {
      name_student: req.body.name_student,
      course: req.body.course,
      num_decision: req.body.num_decision,
      num_year: req.body.num_year,
      num_person: req.body.num_person,
      type_thesis: req.body.type_thesis,
      role: req.body.role,
      type: req.body.type,
      year_id: req.body.year_id,
    }

    const data = await this.thesisRepo.update(params, req.params.id);

    this.created(res, data);
  }
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const article = await this.thesisRepo.delete(req.params.id);

    res.status(OK).json(article)
  }
}
