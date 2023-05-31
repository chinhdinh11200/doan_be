import { Router } from "express";
import ClassController from "../controller/class";
import { createUpload } from "../../utils";

export default function(sequelize: SQLize) {
  const classRouter = Router();
  const classController = new ClassController(sequelize);
  const upload = createUpload('./public/classes');

  classRouter.get('/', classController.search);
  classRouter.get('/dashboard', classController.dashboard);
  classRouter.get('/:id', classController.detail);
  classRouter.post('/', upload.none(), classController.create);
  classRouter.put('/:id', upload.none(), classController.update);
  classRouter.delete('/:id', classController.delete);

  return classRouter;
}