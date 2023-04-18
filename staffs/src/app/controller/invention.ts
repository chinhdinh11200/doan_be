import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class InventionController extends Controller {
    private readonly inventionRepo: repository.Invention;
    constructor(db: DB) {
        super(db);

        this.inventionRepo = new repository.Invention(db);
    }
    
    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.inventionRepo.findOneById(req.params.id);

        res.json(user)
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.invention.InventionSearchParam = {
            ...pickForSearch(<types.invention.InventionSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }
        const data = await this.inventionRepo.search(params);

        
    this.ok(res, data);
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.invention.InventionCreateParam = {
            name: req.body.name,
            code: req.body.code,
            level: req.body.level,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            date_recognition: req.body.date_recognition,
            number_recognition: req.body.number_recognition,
        }
        const data = await this.inventionRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.invention.InventionUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            level: req.body.level,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            date_recognition: req.body.date_recognition,
            number_recognition: req.body.number_recognition,
        }

        const data = await this.inventionRepo.update(params, req.params.id);

        this.created(res, data);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const invention = await this.inventionRepo.delete(req.params.id);

        res.status(OK).json(invention)
    }
}
