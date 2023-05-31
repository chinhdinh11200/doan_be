import { Router } from 'express';
import RoomController from '../controller/room';
import { createUpload } from '../../utils';

export default function (sequelize: SQLize) {
    const roomRouter = Router();
    const roomController = new RoomController(sequelize);
    const upload = createUpload('./public/room');

    roomRouter.post('/', upload.none(), roomController.create);
    roomRouter.put('/:id', upload.none(), roomController.update);
    roomRouter.get('/:id', roomController.detail);
    roomRouter.delete('/:id', roomController.delete);
    roomRouter.get('/', roomController.search);
    
    return roomRouter;
}
