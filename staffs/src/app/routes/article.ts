import { Router } from "express";
import ArticleController from "../controller/article";

export default function (sequelize: SQLize) {
    const articleRouter = Router();
    const articleController = new ArticleController(sequelize);

    articleRouter.get('/', articleController.search);
    articleRouter.get('/:id', articleController.detail);
    articleRouter.post('/', articleController.create);
    articleRouter.put('/:id', articleController.update);
    articleRouter.delete('/:id', articleController.delete);

    return articleRouter;
}