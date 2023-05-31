import { Router } from "express";
import CompilationController from "../controller/compilation";
import { createUpload } from "../../utils";

export default function (sequelize: SQLize) {
    const compilationRouter = Router();
    const compilationController = new CompilationController(sequelize);
    const upload = createUpload('./public/compilation');

    compilationRouter.get('/', compilationController.search);
    compilationRouter.get('/:id', compilationController.detail);
    compilationRouter.post('/', upload.none(), compilationController.create);
    compilationRouter.put('/:id', upload.none(), compilationController.update);
    compilationRouter.delete('/:id', compilationController.delete);

    return compilationRouter;
}