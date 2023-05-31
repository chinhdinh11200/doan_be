import { Router } from 'express';
import DepartmentController from '../controller/department';
import { createUpload } from '../../utils';

export default function (sequelize: SQLize) {
  const departmentRouter = Router();
  const departmentController = new DepartmentController(sequelize);
  const upload = createUpload('./public/department');

  departmentRouter.post('/', upload.none(), departmentController.create);
  departmentRouter.get('/:id', departmentController.detail);
  departmentRouter.put('/:id', upload.none(), departmentController.update);
  departmentRouter.delete('/:id', departmentController.delete);
  departmentRouter.get('/', departmentController.search);

  return departmentRouter;
}
