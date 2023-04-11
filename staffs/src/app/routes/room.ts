import { Router } from 'express';
import RoomController from '../controller/room';

export default function (sequelize: SQLize) {
    const roomRouter = Router();
    const roomController = new RoomController(sequelize);

    roomRouter.post('/', roomController.create);
    roomRouter.put('/:id', roomController.update);
    roomRouter.get('/:id', roomController.detail);
    roomRouter.delete('/:id', roomController.delete);
    roomRouter.get('/', roomController.search);
    
    return roomRouter;
}
