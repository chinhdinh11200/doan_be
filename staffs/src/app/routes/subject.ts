import { Router } from "express";
import SubjectController from "../controller/subject";
import { createUpload } from "../../utils";

export default function(sequelize: SQLize) {
  const subjectRouter = Router();
  const subjectController = new SubjectController(sequelize);
  const upload = createUpload('./public/subject');

  subjectRouter.get('/', subjectController.search);
  subjectRouter.get('/:id', subjectController.detail);
  subjectRouter.post('/', upload.none(), subjectController.create);
  subjectRouter.put('/:id', upload.none(), subjectController.update);
  subjectRouter.delete('/:id', subjectController.delete);

  return subjectRouter;
}