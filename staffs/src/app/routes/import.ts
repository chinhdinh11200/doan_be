import { Router } from 'express';
import ImportController from '../controller/import';
import multer = require('multer');
import { createUpload } from '../../utils';

export default function (sequelize: SQLize) {
  const importRouter = Router();
  const importController = new ImportController(sequelize);
  const upload = createUpload('./public');

  importRouter.post('/user', /*upload.single('dcm'), */ importController.user);
  importRouter.post('/import', upload.single('import'), importController.user);

  return importRouter;
}
