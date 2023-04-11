import { Router } from "express";
import TopicController from "../controller/topic";

export default function (sequelize: SQLize) {
    const topicRouter = Router();
    const topicController = new TopicController(sequelize);

    topicRouter.get('/', topicController.search);
    topicRouter.get('/:id', topicController.detail);
    topicRouter.post('/', topicController.create);
    topicRouter.put('/:id', topicController.update);
    topicRouter.delete('/:id', topicController.delete);

    return topicRouter;
}