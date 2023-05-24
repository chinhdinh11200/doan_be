import { Router } from "express";
import TopicController from "../controller/topic";
import { createUpload } from "../../utils";

export default function (sequelize: SQLize) {
    const topicRouter = Router();
    const topicController = new TopicController(sequelize);
    const upload = createUpload('./public');

    topicRouter.get('/', topicController.search);
    topicRouter.get('/:id', topicController.detail);
    topicRouter.post('/', upload.none(), topicController.create);
    topicRouter.put('/:id', upload.none(), topicController.update);
    topicRouter.delete('/:id', topicController.delete);

    return topicRouter;
}