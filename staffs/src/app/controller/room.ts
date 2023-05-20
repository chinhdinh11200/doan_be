import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class RoomController extends Controller {
    private readonly roomRepo: repository.Room;
    constructor(db: DB) {
        super(db);

        this.roomRepo = new repository.Room(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.room.RoomSearchParam = {
            ...pickForSearch(<types.room.RoomSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }

        const data = await this.roomRepo.search(params);

        this.ok(res, data);
    }

    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const room = await this.roomRepo.findById(req.params.id);

        res.json(room);
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.room.RoomCreateParam = {
            subject_id: req.body.subject_id,
            user_id: req.body.user_id,
            time: req.body.time,
            type: req.body.type,
            factor: req.body.factor,
            name: req.body.name,
            code: req.body.code,
            semester: req.body.semester,
            num_exam_session: req.body.num_exam_session,
            startDate: req.body.startDate,
            year_id: req.body.year_id,
        }
        const data = await this.roomRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.room.RoomCreateParam = {
            subject_id: req.body.subject_id,
            user_id: req.body.user_id,
            time: req.body.time,
            type: req.body.type,
            factor: req.body.factor,
            name: req.body.name,
            code: req.body.code,
            semester: req.body.semester,
            num_exam_session: req.body.num_exam_session,
            startDate: req.body.startDate,
            year_id: req.body.year_id,
        }

        const data = await this.roomRepo.update(params, req.params.id);

        this.created(res, data);
    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const room = await this.roomRepo.delete(req.params.id);

        res.status(OK).json(room)
    }
}
