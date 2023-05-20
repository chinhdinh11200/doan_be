import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class EducationController extends Controller {
    private readonly educationRepo: repository.Education;
    constructor(db: DB) {
        super(db);

        this.educationRepo = new repository.Education(db);
    }
    
    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.educationRepo.detail(req.params.id);

        res.json(user)
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.education.EducationSearchParam = {
            ...pickForSearch(<types.education.EducationSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }
        const data = await this.educationRepo.search(params);

        this.ok(res, data);
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.education.EducationCreateParam = {
            name: req.body.name,
            code: req.body.code,
            role: req.body.role,
            type: req.body.type,
            num_credit: req.body.num_credit,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            form_construction: req.body.form_construction,
            num_decision: req.body.num_decision,
            date_decision: req.body.date_decision,
            year_id: req.body.year_id,
        }
        const data = await this.educationRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.education.EducationUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            role: req.body.role,
            type: req.body.type,
            num_credit: req.body.num_credit,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            form_construction: req.body.form_construction,
            num_decision: req.body.num_decision,
            date_decision: req.body.date_decision,
            year_id: req.body.year_id,
        }

        const data = await this.educationRepo.update(params, req.params.id);

        this.created(res, data);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const education = await this.educationRepo.delete(req.params.id);

        res.status(OK).json(education)
    }
}
