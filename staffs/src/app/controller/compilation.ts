import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class CompilationController extends Controller {
    private readonly compilationRepo: repository.Compilation;
    constructor(db: DB) {
        super(db);

        this.compilationRepo = new repository.Compilation(db);
    }
    
    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.compilationRepo.findOneById(req.params.id);

        res.json(user)
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.compilation.CompilationSearchParam = {
            ...pickForSearch(<types.compilation.CompilationSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }
        const data = await this.compilationRepo.search(params);

        this.ok(res, data);
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.compilation.CompilationCreateParam = {
            name: req.body.name,
            code: req.body.code,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            number_credit: req.body.number_credit,
            date_decision: req.body.date_decision,
            num_decision: req.body.num_decision,
        }

        const compilation = await this.compilationRepo.create(params);

        res.status(OK).json(compilation);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.compilation.CompilationUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            number_credit: req.body.number_credit,
            date_decision: req.body.date_decision,
            num_decision: req.body.num_decision,
        }

        const compilation = await this.compilationRepo.update(params, req.params.id);

        res.status(OK).json(compilation);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const compilation = await this.compilationRepo.delete(req.params.id);

        res.status(OK).json(compilation)
    }
}
