import { Router } from "express";
import ArticleController from "../controller/article";
import { createUpload } from "../../utils";

export default function (sequelize: SQLize) {
    const articleRouter = Router();
    const articleController = new ArticleController(sequelize);
    const upload = createUpload('./public/article');

    articleRouter.get('/', articleController.search);
    articleRouter.get('/:id', articleController.detail);
    articleRouter.post('/', upload.none(), articleController.create);
    articleRouter.put('/:id', upload.none(), articleController.update);
    articleRouter.delete('/:id', articleController.delete);

    return articleRouter;
}