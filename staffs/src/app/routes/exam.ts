import { Router } from 'express';
import ExamController from '../controller/exam';

export default function (sequelize: SQLize) {
    const examRouter = Router();
    const examController = new ExamController(sequelize);

    examRouter.post('/', examController.create);
    examRouter.put('/:id', examController.update);
    examRouter.delete('/:id', examController.delete);
    examRouter.get('/', examController.search);

    return examRouter;
}
