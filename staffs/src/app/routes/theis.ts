import { Router } from "express";
import ThesisController from "../controller/theis";

export default function(sequelize: SQLize) {
  const thesisRouter = Router();
  const thesisController = new ThesisController(sequelize);

  thesisRouter.get('/', thesisController.search);
  thesisRouter.get('/:id', thesisController.detail);
  thesisRouter.post('/', thesisController.create);
  thesisRouter.put('/:id', thesisController.update);
  thesisRouter.delete('/:id', thesisController.delete);

  return thesisRouter;
}