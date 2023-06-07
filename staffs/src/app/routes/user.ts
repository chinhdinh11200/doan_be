import { Router, NextFunction, Request, Response } from 'express';
import StaffController from '../controller/user';
import * as userValidator from '../validator/user';
import { DB } from '../../models';
import validators from '../middlewares/validators';
import { createUpload } from '../../utils';

export default function (sequelize: DB) {
  const staffRouter = Router();
  const staffController = new StaffController(sequelize);
  const upload = createUpload('./public/avatar');
  staffRouter.post(
    '/',
    // upload.single('avatar'), 
    upload.none(),
    userValidator.create,
    validators,
    staffController.create
  );
  staffRouter.put('/:id', upload.single('avatar'), staffController.update);
  staffRouter.delete('/:id', staffController.delete);
  staffRouter.get('/', staffController.search);
  staffRouter.get('/:id', staffController.detail);

  return staffRouter;
}
