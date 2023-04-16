import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class ScientificController extends Controller {
    private readonly scientificRepo: repository.Scientific;
    constructor(db: DB) {
        super(db);

        this.scientificRepo = new repository.Scientific(db);
    }

    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.scientificRepo.findOneById(req.params.id);

        res.json(user)
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.scientific.ScientificSearchParam = {
            ...pickForSearch(<types.scientific.ScientificSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }
        const data = await this.scientificRepo.search(params);

        this.ok(res, data);
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.scientific.ScientificCreateParam = {
            name: req.body.name,
            code: req.body.code,
            num_decision: req.body.num_decision,
            total_time: req.body.total_time,
            result_level: req.body.result_level,
            result_academy: req.body.result_academy,
            date_decision: req.body.date_decision,
        }
        const data = await this.scientificRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.scientific.ScientificUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            num_decision: req.body.num_decision,
            total_time: req.body.total_time,
            result_level: req.body.result_level,
            result_academy: req.body.result_academy,
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
