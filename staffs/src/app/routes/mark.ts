import { Router } from 'express';
import MarkController from '../controller/mark';
import { createUpload } from '../../utils';

export default function (sequelize: SQLize) {
    const markRouter = Router();
    const markController = new MarkController(sequelize);
    const upload = createUpload('./public/mark');

    markRouter.post('/', upload.none(), markController.create);
    markRouter.get('/:id', markController.detail);
    markRouter.put('/:id', upload.none(), markController.update);
    markRouter.delete('/:id', markController.delete);
    markRouter.get('/', markController.search);

    return markRouter;
}
