import { Router } from "express";
import InventionController from "../controller/invention";

export default function (sequelize: SQLize) {
    const inventionRouter = Router();
    const inventionController = new InventionController(sequelize);

    inventionRouter.get('/', inventionController.search);
    inventionRouter.get('/:id', inventionController.detail);
    inventionRouter.post('/', inventionController.create);
    inventionRouter.put('/:id', inventionController.update);
    inventionRouter.delete('/:id', inventionController.delete);

    return inventionRouter;
}