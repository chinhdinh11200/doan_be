import { Router } from 'express';
import DepartmentController from '../controller/department';

export default function (sequelize: SQLize) {
  const departmentRouter = Router();
  const departmentController = new DepartmentController(sequelize);

  departmentRouter.post('/', departmentController.create);
  departmentRouter.put('/', departmentController.update);
  departmentRouter.delete('/:id', departmentController.delete);
  departmentRouter.get('/', departmentController.search);

  return departmentRouter;
}
