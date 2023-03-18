import { Router } from "express";
import SubjectController from "../controller/subject";

export default function(sequelize: SQLize) {
  const subjectRouter = Router();
  const subjectController = new SubjectController(sequelize);

  subjectRouter.get('/', subjectController.search);
  subjectRouter.post('/', subjectController.create);
  subjectRouter.put('/:id', subjectController.update);
  subjectRouter.delete('/:id', subjectController.delete);

  return subjectRouter;
}