import { Router } from "express";
import BookController from "../controller/book";

export default function (sequelize: SQLize) {
    const bookRouter = Router();
    const bookController = new BookController(sequelize);

    bookRouter.get('/', bookController.search);
    bookRouter.get('/:id', bookController.detail);
    bookRouter.post('/', bookController.create);
    bookRouter.put('/:id', bookController.update);
    bookRouter.delete('/:id', bookController.delete);

    return bookRouter;
}