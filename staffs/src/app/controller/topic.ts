import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';

export default class TopicController extends Controller {
    private readonly topicRepo: repository.Topic;
    constructor(db: DB) {
        super(db);

        this.topicRepo = new repository.Topic(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.topic.TopicSearchParam = {
            name: req.params.name,
            code: req.params.code,
            search: req.params.search,
        }
        const topics = await this.topicRepo.search(params);

        res.status(OK).json(topics);

    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.topic.TopicCreateParam = {
            name: req.body.name,
            code: req.body.code,
            level: req.body.level,
            endDate: req.body.endDate,
            result: req.body.result,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
        }

        const topic = await this.topicRepo.create(params);

        res.status(OK).json(topic);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.topic.TopicUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            level: req.body.level,
            endDate: req.body.endDate,
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
