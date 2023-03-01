import { Router } from "express";
import SubjectController from "../controller/subject";

export default function(sequelize: SQLize) {
  const subjectRouter = Router();
  const subjectController = new SubjectController(sequelize);

  subjectRouter.get('/', subjectController.search);

  return subjectRouter;
}