import { Router } from 'express';
import MarkController from '../controller/mark';

export default function (sequelize: SQLize) {
    const markRouter = Router();
    const markController = new MarkController(sequelize);

    markRouter.post('/', markController.create);
    markRouter.put('/:id', markController.update);
    markRouter.delete('/:id', markController.delete);
    markRouter.get('/', markController.search);

    return markRouter;
}
