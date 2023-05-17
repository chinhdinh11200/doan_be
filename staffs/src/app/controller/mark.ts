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
        const mark = await this.markRepo.detail(req.params.id);

        res.json(mark)
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
            subject_id: req.body.subject_id,
            user_id: req.body.user_id,
            form_mark: req.body.form_mark,
            type: req.body.type,
            num_exam: req.body.num_exam,
            date_exam: req.body.date_exam,
            semester: req.body.semester,
        }
        const data = await this.markRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.mark.MarkCreateParam = {
            subject_id: req.body.subject_id,
            user_id: req.body.user_id,
            form_mark: req.body.form_mark,
            type: req.body.type,
            num_exam: req.body.num_exam,
            date_exam: req.body.date_exam,
            semester: req.body.semester,
        }

        const data = await this.markRepo.update(params, req.params.id);

        this.created(res, data);
    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const mark = await this.markRepo.delete(req.params.id);

        res.status(OK).json(mark)
    }
}
