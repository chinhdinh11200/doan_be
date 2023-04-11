import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';
import { pickForSearch } from '../../utils';

export default class BookController extends Controller {
    private readonly bookRepo: repository.Book;
    constructor(db: DB) {
        super(db);

        this.bookRepo = new repository.Book(db);
    }
    
    public detail = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.bookRepo.findOneById(req.params.id);

        res.json(user)
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.book.BookSearchParam = {
            ...pickForSearch(<types.book.BookSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
            ...this.getOffsetLimit(req),
        }
        const data = await this.bookRepo.search(params);

        this.ok(res, data);

    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.book.BookCreateParam = {
            name: req.body.name,
                    code: req.body.code,
                    num_publish: req.body.num_publish,
                    num_person: req.body.num_person,
                    total_time: req.body.total_time,
                    num_page: req.body.num_page,
        }

        const book = await this.bookRepo.create(params);

        res.status(OK).json(book);
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {

        const params: types.book.BookUpdateParam = {
            name: req.body.name,
            code: req.body.code,
            num_publish: req.body.num_publish,
            num_person: req.body.num_person,
            total_time: req.body.total_time,
            num_page: req.body.num_page,
        }

        const book = await this.bookRepo.update(params, req.params.id);

        res.status(OK).json(book);

    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const book = await this.bookRepo.delete(req.params.id);

        res.status(OK).json(book)
    }
}
