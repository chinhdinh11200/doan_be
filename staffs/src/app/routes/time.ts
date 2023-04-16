import { Router } from 'express';
import TimeController from '../controller/time';

export default function (sequelize: SQLize) {
    const timeRouter = Router();
    const timeController = new TimeController(sequelize);
    
    timeRouter.get('/', timeController.search);

    return timeRouter;
}
