import { Router } from "express";
import ScientificController from "../controller/scientific";

export default function (sequelize: SQLize) {
    const scientificRouter = Router();
    const scientificController = new ScientificController(sequelize);

    scientificRouter.get('/', scientificController.search);
    scientificRouter.get('/:id', scientificController.detail);
    scientificRouter.post('/', scientificController.create);
    scientificRouter.put('/:id', scientificController.update);
    scientificRouter.delete('/:id', scientificController.delete);

    return scientificRouter;
}