import { Router } from "express";
import EducationController from "../controller/education";

export default function (sequelize: SQLize) {
    const educationRouter = Router();
    const educationController = new EducationController(sequelize);

    educationRouter.get('/', educationController.search);
    educationRouter.post('/', educationController.create);
    educationRouter.put('/:id', educationController.update);
    educationRouter.delete('/:id', educationController.delete);

    return educationRouter;
}