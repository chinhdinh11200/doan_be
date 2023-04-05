import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class ArticleController extends Controller {
    private readonly articleRepo: repository.Article;
    constructor(db: DB) {
        super(db);

        this.articleRepo = new repository.Article(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.article.ArticleSearchParam = {
            ...pickForSearch(<types.article.ArticleSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }
        const articles = await this.articleRepo.search(params);

        res.status(OK).json(articles);

    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.article.ArticleCreateParam = {
            name: req.body.name,
            code: req.body.code,
            type: req.body.type,
            index_article: req.body.index_article,
            total_time: req.body.total_time,
            num_person: req.body.num_person,
        }

        const article = await this.articleRepo.create(params);

        res.status(OK).json(article);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.article.ArticleUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            type: req.body.type,
            index_article: req.body.index_article,
            total_time: req.body.total_time,
            num_person: req.body.num_person,
        }

        const article = await this.articleRepo.update(params, req.params.id);

        res.status(OK).json(article);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const article = await this.articleRepo.delete(req.params.id);

        res.status(OK).json(article)
    }
}
