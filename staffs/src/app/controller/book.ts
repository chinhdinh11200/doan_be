import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { OK } from 'http-status';

export default class BookController extends Controller {
    private readonly bookRepo: repository.Book;
    constructor(db: DB) {
        super(db);

        this.bookRepo = new repository.Book(db);
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        const params: types.book.BookSearchParam = {
            name: req.params.name,
            code: req.params.code,
            search: req.params.search,
        }
        const books = await this.bookRepo.search(params);

        res.status(OK).json(books);

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
