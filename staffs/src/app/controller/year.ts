import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class yearController extends Controller {
  private readonly yearRepo: repository.Year;
  constructor(db: DB) {
    super(db);

    this.yearRepo = new repository.Year(db);
  }

  public detail = async (req: Request, res: Response, next: NextFunction) => {
    const years = await this.yearRepo.findById(req.params.id);

    res.json(years);
  }

  public search = async (req: Request, res: Response, next: NextFunction) => {
    const params: types.year.YearSearchParam = {
      ...pickForSearch(<types.year.YearSearchParam>req.query, ['name', 'search', 'sort', 'sortColumn']),
      ...this.getOffsetLimit(req),
    }

    const data = await this.yearRepo.search(params);

    this.ok(res, data);
  }
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const params: types.year.YearCreateParam = {
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      semester: req.body.semester,
    }

    const data = await this.yearRepo.create(params);

    this.created(res, data.dataValues);
  }
  public update = async (req: Request, res: Response, next: NextFunction) => {

    const params: types.year.YearUpdateParam = {
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      semester: req.body.semester,
    }
    const data = await this.yearRepo.update(params, req.params.id);

    this.created(res, data);
  }
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const year = await this.yearRepo.delete(req.params.id);

    res.status(OK).json(year)
  }
}
