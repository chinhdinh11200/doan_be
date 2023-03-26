import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';

export default class ScientificController extends Controller {
    private readonly scientificRepo: repository.Scientific;
    constructor(db: DB) {
        super(db);

        this.scientificRepo = new repository.Scientific(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.scientific.ScientificSearchParam = {
            name: req.params.name,
            code: req.params.code,
            search: req.params.search,
        }
        const scientifics = await this.scientificRepo.search(params);

        res.status(OK).json(scientifics);

    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.scientific.ScientificCreateParam = {
            name: req.body.name,
            code: req.body.code,
            num_decision: req.body.num_decision,
            total_time: req.body.total_time,
            result_level: req.body.result_level,
            date_decision: req.body.date_decision,
        }

        const scientific = await this.scientificRepo.create(params);

        res.status(OK).json(scientific);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.scientific.ScientificUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            num_decision: req.body.num_decision,
            total_time: req.body.total_time,
            result_level: req.body.result_level,
            date_decision: req.body.date_decision,
        }

        const scientific = await this.scientificRepo.update(params, req.params.id);

        res.status(OK).json(scientific);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const scientific = await this.scientificRepo.delete(req.params.id);

        res.status(OK).json(scientific)
    }
}
