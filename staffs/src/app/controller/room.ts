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

        const rooms = await this.roomRepo.search(params);

        res.status(OK).json(rooms);

    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.room.RoomCreateParam = {
            exam_id: Number(req.body.exam_id),
            name: req.body.name,
            code: req.body.code,
            num_student: Number(req.body.num_student),
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            semester: req.body.semester,
        }

        const room = await this.roomRepo.create(params);

        res.status(OK).json(room);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.room.RoomCreateParam = {
            exam_id: req.body.exam_id,
            name: req.body.name,
            code: req.body.code,
            num_student: Number(req.body.num_student),
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            semester: req.body.semester,
        }

        const room = await this.roomRepo.update(params, req.params.id);

        res.status(OK).json(room);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const room = await this.roomRepo.delete(req.params.id);

        res.status(OK).json(room)
    }
}
