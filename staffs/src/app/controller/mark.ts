import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class MarkController extends Controller {
    private readonly markRepo: repository.Mark;
    constructor(db: DB) {
        super(db);

        this.markRepo = new repository.Mark(db);
    }

    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.markRepo.findOneById(req.params.id);

        res.json(user)
    }
    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.mark.MarkSearchParam = {
            ...pickForSearch(<types.mark.MarkSearchParam>req.query, ['form_mark', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }

        const data = await this.markRepo.search(params);

        this.ok(res, data);
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.mark.MarkCreateParam = {
            exam_id: req.body.exam_id,
            form_mark: req.body.form_mark,
            time_mark: req.body.time_mark,
        }
        const data = await this.markRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.mark.MarkCreateParam = {
            exam_id: req.body.exam_id,
            form_mark: req.body.form_mark,
            time_mark: req.body.time_mark,
        }

        const mark = await this.markRepo.update(params, req.params.id);

        res.status(OK).json(mark);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const mark = await this.markRepo.delete(req.params.id);

        res.status(OK).json(mark)
    }
}
