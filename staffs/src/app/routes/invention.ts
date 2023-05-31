import { Router } from "express";
import InventionController from "../controller/invention";
import { createUpload } from "../../utils";

export default function (sequelize: SQLize) {
    const inventionRouter = Router();
    const inventionController = new InventionController(sequelize);
    const upload = createUpload('./public/invention');

    inventionRouter.get('/', inventionController.search);
    inventionRouter.get('/:id', inventionController.detail);
    inventionRouter.post('/', upload.none(), inventionController.create);
    inventionRouter.put('/:id', upload.none(), inventionController.update);
    inventionRouter.delete('/:id', inventionController.delete);

    return inventionRouter;
}