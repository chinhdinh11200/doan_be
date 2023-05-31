import { Router } from "express";
import ThesisController from "../controller/theis";
import { createUpload } from "../../utils";

export default function(sequelize: SQLize) {
  const thesisRouter = Router();
  const thesisController = new ThesisController(sequelize);
  const upload = createUpload('./public/thesis');

  thesisRouter.get('/', thesisController.search);
  thesisRouter.get('/:id', thesisController.detail);
  thesisRouter.post('/', upload.none(), thesisController.create);
  thesisRouter.put('/:id', upload.none(), thesisController.update);
  thesisRouter.delete('/:id', thesisController.delete);

  return thesisRouter;
}