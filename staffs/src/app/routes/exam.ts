import { Router } from 'express';
import ExamController from '../controller/exam';
import { createUpload } from '../../utils';

export default function (sequelize: SQLize) {
    const examRouter = Router();
    const examController = new ExamController(sequelize);
    const upload = createUpload('./public/exam');

    examRouter.post('/', upload.none(), examController.create);
    examRouter.put('/:id', upload.none(), examController.update);
    examRouter.get('/:id', examController.detail);
    examRouter.delete('/:id', examController.delete);
    examRouter.get('/', examController.search);

    return examRouter;
}
