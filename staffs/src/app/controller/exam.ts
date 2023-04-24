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
            semester_id: req.body.semester_id,
            subject_id: req.body.subject_id,
            name: req.body.name,
            code: req.body.code,
            form_exam: req.body.form_exam,
            number_question: Number(req.body.number_question),
            num_code: Number(req.body.num_code),
            time_work: Number(req.body.time_work),
            num_student: Number(req.body.num_student),
            type: Number(req.body.type),
        }
        const data = await this.examRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.exam.ExamCreateParam = {
            user_id: req.body.user_id,
            semester_id: req.body.semester_id,
            subject_id: req.body.subject_id,
            name: req.body.name,
            code: req.body.code,
            form_exam: req.body.form_exam,
            number_question: Number(req.body.number_question),
            num_code: Number(req.body.num_code),
            time_work: Number(req.body.time_work),
            number_quizzes: Number(req.body.number_quizzes),
            marking: Number(req.body.marking),
            num_student: Number(req.body.num_student),
            exam_create: Number(req.body.exam_create),
            exam_supervision: Number(req.body.exam_supervision),
            type: Number(req.body.type),
        }

        const data = await this.examRepo.update(params, req.params.id);

        this.created(res, data);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const exam = await this.examRepo.delete(req.params.id);

        res.status(OK).json(exam)
    }
}
