import { Router } from "express";
import YearController from "../controller/year";
import { createUpload } from '../../utils';

export default function (sequelize: SQLize) {
  const yearRouter = Router();
  const yearController = new YearController(sequelize);

  const upload = createUpload('./public');
  yearRouter.get('/', yearController.search);
  yearRouter.get('/:id', yearController.detail);
  yearRouter.post('/', upload.single(''), yearController.create);
  yearRouter.put('/:id', upload.single(''), yearController.update);
  yearRouter.delete('/:id', yearController.delete);

  return yearRouter;
}