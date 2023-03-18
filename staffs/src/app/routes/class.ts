import { Router } from "express";
import ClassController from "../controller/class";

export default function(sequelize: SQLize) {
  const classRouter = Router();
  const classController = new ClassController(sequelize);

  classRouter.get('/', classController.search);
  classRouter.post('/', classController.create);
  classRouter.put('/:id', classController.update);
  classRouter.delete('/:id', classController.delete);

  return classRouter;
}