import { Router } from "express";
import CompilationController from "../controller/compilation";

export default function (sequelize: SQLize) {
    const compilationRouter = Router();
    const compilationController = new CompilationController(sequelize);

    compilationRouter.get('/', compilationController.search);
    compilationRouter.post('/', compilationController.create);
    compilationRouter.put('/:id', compilationController.update);
    compilationRouter.delete('/:id', compilationController.delete);

    return compilationRouter;
}