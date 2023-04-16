import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class TopicController extends Controller {
    private readonly topicRepo: repository.Topic;
    constructor(db: DB) {
        super(db);

        this.topicRepo = new repository.Topic(db);
    }

    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.topicRepo.findOneById(req.params.id);

        res.json(user)
    }
    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.topic.TopicSearchParam = {
            ...pickForSearch(<types.topic.TopicSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }
        const data = await this.topicRepo.search(params);

        this.ok(res, data);
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.topic.TopicCreateParam = {
            name: req.body.name,
            code: req.body.code,
            role: req.body.role,
            level: req.body.level,
            endDate: req.body.endDate,
            startDate: req.body.startDate,
            acceptDate: req.body.acceptDate,
            result: req.body.result,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            type: req.body.type,
        }
        const data = await this.topicRepo.create(params);

        this.created(res, data);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.topic.TopicUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            role: req.body.role,
            level: req.body.level,
            endDate: req.body.endDate,
            startDate: req.body.startDate,
            acceptDate: req.body.acceptDate,
            result: req.body.result,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
        }

        const topic = await this.topicRepo.update(params, req.params.id);

        res.status(OK).json(topic);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const topic = await this.topicRepo.delete(req.params.id);

        res.status(OK).json(topic)
    }
}
