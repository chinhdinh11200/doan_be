import { Router, NextFunction, Request, Response } from 'express';
import StaffController from '../controller/user';
import * as userValidator from '../validator/user';
import { DB } from '../../models';
import validators from '../middlewares/validators';

export default function (sequelize: DB) {
  const staffRouter = Router();
  const staffController = new StaffController(sequelize);

  staffRouter.post(
    '/',
    userValidator.create,
    validators,
    staffController.create
  );
  staffRouter.put('/:id', staffController.update);
  staffRouter.delete('/:id', staffController.delete);
  staffRouter.get('/', staffController.search);

  return staffRouter;
}
