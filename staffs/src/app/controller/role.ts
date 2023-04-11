import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class RoleController extends Controller {
    private readonly roleRepo: repository.Role;
    constructor(db: DB) {
        super(db);

        this.roleRepo = new repository.Role(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.role.RoleSearchParam = {
            ...pickForSearch(<types.role.RoleSearchParam>req.query, ['name', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }
        const data = await this.roleRepo.search(params);

        this.ok(res, data);
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.role.RoleCreateParam = {
            name: req.body.name,
            time: req.body.time,
            type: req.body.type,
        }

        const role = await this.roleRepo.create(params);

        res.status(OK).json(role);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.role.RoleUpdateParam = {
            name: req.body.name,
            time: req.body.time,
            type: req.body.type,
        }

        const role = await this.roleRepo.update(params, req.params.id);

        res.status(OK).json(role);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const role = await this.roleRepo.delete(req.params.id);

        res.status(OK).json(role)
    }
}
