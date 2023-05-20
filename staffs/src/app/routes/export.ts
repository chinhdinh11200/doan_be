import { Router } from 'express';
import ExportController from '../controller/export';

export default function (sequelize: SQLize) {
  const exportRouter = Router();
  const exportController = new ExportController(sequelize);
  exportRouter.get('/user/:id', exportController.user);
  // exportRouter.put('/:id', exportController.update);
  // exportRouter.get('/:id', exportController.detail);
  // exportRouter.delete('/:id', exportController.delete);
  // exportRouter.get('/', exportController.search);

  return exportRouter;
}
