import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';

export default class MarkController extends Controller {
    private readonly markRepo: repository.Mark;
    constructor(db: DB) {
        super(db);

        this.markRepo = new repository.Mark(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.mark.MarkSearchParam = {
            form_mark: Number(req.params.form_mark),
            time_mark: Number(req.params.time_mark),
            exam_id: Number(req.params.exam_id),
            search: req.params.search,
        }

        const marks = await this.markRepo.search(params);

        res.status(OK).json(marks);

    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.mark.MarkCreateParam = {
            exam_id: req.body.exam_id,
            form_mark: req.body.form_mark,
            time_mark: req.body.time_mark,
        }

        const mark = await this.markRepo.create(params);

        res.status(OK).json(mark);
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
