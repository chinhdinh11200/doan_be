import { Router } from "express";
import BookController from "../controller/book";
import { createUpload } from "../../utils";

export default function (sequelize: SQLize) {
    const bookRouter = Router();
    const bookController = new BookController(sequelize);
    const upload = createUpload('./public/book')
    bookRouter.get('/', bookController.search);
    bookRouter.get('/:id', bookController.detail);
    bookRouter.post('/', upload.none(), bookController.create);
    bookRouter.put('/:id', upload.none(), bookController.update);
    bookRouter.delete('/:id', bookController.delete);

    return bookRouter;
}