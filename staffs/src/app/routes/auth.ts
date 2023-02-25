import { Router } from 'express';
import AuthController from '../controller/auth';

export default function (sequelize: SQLize) {
  const authRouter = Router();
  const authController = new AuthController(sequelize);

  authRouter.post('/login', authController.login);
  authRouter.get('/refresh', authController.refreshToken);
  authRouter.post('/logout', authController.logout);
  authRouter.post(
    '/send-mail-reset-password',
    authController.sendMailResetPassword
  );
  authRouter.post('/reset-password', authController.resetPassword);
  authRouter.post('/change-password', authController.changePassword);

  return authRouter;
}
