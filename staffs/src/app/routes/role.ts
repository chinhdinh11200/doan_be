import { Router } from "express";
import RoleController from "../controller/role";

export default function (sequelize: SQLize) {
    const roleRouter = Router();
    const roleController = new RoleController(sequelize);

    roleRouter.get('/', roleController.search);
    roleRouter.post('/', roleController.create);
    roleRouter.put('/:id', roleController.update);
    roleRouter.delete('/:id', roleController.delete);

    return roleRouter;
}