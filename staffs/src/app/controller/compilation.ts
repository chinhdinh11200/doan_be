import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';

export default class CompilationController extends Controller {
    private readonly compilationRepo: repository.Compilation;
    constructor(db: DB) {
        super(db);

        this.compilationRepo = new repository.Compilation(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.compilation.CompilationSearchParam = {
            name: req.params.name,
            code: req.params.code,
            search: req.params.search,
        }
        const compilations = await this.compilationRepo.search(params);

        res.status(OK).json(compilations);

    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.compilation.CompilationCreateParam = {
            name: req.body.name,
            code: req.body.code,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            number_credit: req.body.number_credit,
            date_decision: req.body.date_decision,
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
        }

        const compilation = await this.compilationRepo.update(params, req.params.id);

        res.status(OK).json(compilation);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const compilation = await this.compilationRepo.delete(req.params.id);

        res.status(OK).json(compilation)
    }
}
