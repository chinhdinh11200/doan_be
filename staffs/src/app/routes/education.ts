import { Router } from "express";
import EducationController from "../controller/education";
import { createUpload } from "../../utils";

export default function (sequelize: SQLize) {
    const educationRouter = Router();
    const educationController = new EducationController(sequelize);
    const upload = createUpload('./public/education');

    educationRouter.get('/', educationController.search);
    educationRouter.get('/:id', educationController.detail);
    educationRouter.post('/', upload.none(), educationController.create);
    educationRouter.put('/:id', upload.none(), educationController.update);
    educationRouter.delete('/:id', educationController.delete);

    return educationRouter;
}