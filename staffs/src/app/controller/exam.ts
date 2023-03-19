import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';

export default class ExamController extends Controller {
    private readonly examRepo: repository.Exam;
    constructor(db: DB) {
        super(db);

        this.examRepo = new repository.Exam(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.exam.ExamSearchParam = {
            name: req.params.name,
            code: req.params.code,
            form_exam: req.params.form_exam,
            number_question: Number(req.params.number_question),
            time_work: Number(req.params.time_work),
            type: Number(req.params.type),
            search: req.params.search,
        }

        const exams = await this.examRepo.search(params);

        res.status(OK).json(exams);

    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.exam.ExamCreateParam = {
            user_id: req.body.user_id,
            name: req.body.name,
            code: req.body.code,
            form_exam: req.body.form_exam,
            number_question: Number(req.body.number_question),
            time_work: Number(req.body.time_work),
            type: Number(req.body.type),
        }

        const exam = await this.examRepo.create(params);

        res.status(OK).json(exam);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.exam.ExamCreateParam = {
            user_id: req.body.user_id,
            name: req.body.name,
            code: req.body.code,
            form_exam: req.body.form_exam,
            number_question: Number(req.body.number_question),
            time_work: Number(req.body.time_work),
            type: Number(req.body.type),
        }

        const exam = await this.examRepo.update(params, req.params.id);

        res.status(OK).json(exam);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const exam = await this.examRepo.delete(req.params.id);

        res.status(OK).json(exam)
    }
}
