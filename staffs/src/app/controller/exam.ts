import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class ExamController extends Controller {
    private readonly examRepo: repository.Exam;
    constructor(db: DB) {
        super(db);

        this.examRepo = new repository.Exam(db);
    }

    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const exam = await this.examRepo.findById(req.params.id);

        res.json(exam);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.exam.ExamSearchParam = {
            ...pickForSearch(<types.exam.ExamSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }

        const data = await this.examRepo.search(params);

        this.ok(res, data);
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.exam.ExamCreateParam = {
            user_id: req.body.user_id,
            subject_id: req.body.subject_id,
            name: req.body.name,
            code: req.body.code,
            factor: req.body.factor,
            type: req.body.type,
            num_exam: req.body.num_exam,
            semester: req.body.semester,
            num_question: req.body.num_question,
        }
        const data = await this.examRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.exam.ExamCreateParam = {
            user_id: req.body.user_id,
            subject_id: req.body.subject_id,
            name: req.body.name,
            code: req.body.code,
            factor: req.body.factor,
            type: req.body.type,
            num_exam: req.body.num_exam,
            semester: req.body.semester,
            num_question: req.body.num_question,
        }

        const data = await this.examRepo.update(params, req.params.id);

        this.created(res, data);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const exam = await this.examRepo.delete(req.params.id);

        res.status(OK).json(exam)
    }
}
