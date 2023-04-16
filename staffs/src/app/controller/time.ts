import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class TimeController extends Controller {
    private readonly timeRepo: repository.Time;
    constructor(db: DB) {
        super(db);

        this.timeRepo = new repository.Time(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.exam.ExamSearchParam = {
            ...pickForSearch(<types.exam.ExamSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }

        const data = await this.timeRepo.search(params);

        this.ok(res, data);
    }
   
}
