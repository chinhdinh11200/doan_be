import { Router } from "express";
import ScientificController from "../controller/scientific";
import { createUpload } from "../../utils";

export default function (sequelize: SQLize) {
    const scientificRouter = Router();
    const scientificController = new ScientificController(sequelize);
    const upload = createUpload('./public/scientific');

    scientificRouter.get('/', scientificController.search);
    scientificRouter.get('/:id', scientificController.detail);
    scientificRouter.post('/', upload.none(), scientificController.create);
    scientificRouter.put('/:id', upload.none(), scientificController.update);
    scientificRouter.delete('/:id', scientificController.delete);

    return scientificRouter;
}