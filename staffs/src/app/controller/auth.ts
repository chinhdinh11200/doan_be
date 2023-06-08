import jwt from 'jsonwebtoken';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import Controller from './base';
import { types } from '../../common';

export default class AuthController extends Controller {
  private authRepo: repository.Auth;
  private userRepo: repository.User;
  private readonly refreshTokenSecret: string =
    process.env.REFRESH_TOKEN_SECRET || 'staff_services';
  private readonly timeAccessTokenExpired: string =
    process.env.ACCESS_TOKEN_EXPIRED || '60s';
  private readonly timeRefreshTokenExpired: string =
    process.env.REFRESH_TOKEN_EXPIRED || '36000s';
  constructor(db: SQLize) {
    super(db);
    this.authRepo = new repository.Auth(db);
    this.userRepo = new repository.User(db);
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const data: types.user.UserLoginParam = {
      username: req.body.username,
      password: req.body.password,
    };
    let dataLogin: any = await this.authRepo.login(data);
    if (dataLogin === false) {
      res.status(401).json({ message: "Unauthorized", success: false });
      // throw new Error();
      return;
    }
    const { token: accessToken } = await this.userRepo.signToken(
      {
        id: dataLogin.id.toString(),
        username: dataLogin.name,
        email: dataLogin.email,
        code: dataLogin.code,
        role: dataLogin.department_id,
        position: dataLogin.position
      },
      this.timeAccessTokenExpired
    );
    const { token: refreshToken } = await this.userRepo.signToken(
      {
        id: dataLogin.id.toString(),
        username: dataLogin.name,
        email: dataLogin.email,
        code: dataLogin.code,
        role: dataLogin.department_id,
        position: dataLogin.position
      },
      this.timeRefreshTokenExpired
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      // maxAge: 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    req.user = <any>dataLogin;

    res.json({ accessToken: accessToken, refreshToken, success: true, user: dataLogin });
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const cookie = req.cookies;
    if (!cookie.jwt) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const refreshToken = cookie.jwt;
    jwt.verify(refreshToken, this.userRepo.getSecret(), async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ "message": "Forbidden" });
      }
      const staffFind = decoded;
      const staff = await this.userRepo.findOneById(staffFind.id);

      if (!staff) {
        return res.status(401).json({ "message": "Unauthorized" });
      }

      const { token: accessToken } = await this.userRepo.signToken({
        id: staff.id.toString(),
        username: staff.name,
        email: staff.email,
        code: staff.code,
        role: staff.department_id,
        position: staff.position
      }, this.timeAccessTokenExpired);
      res.json({ accessToken });

    });
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies;
    if (!cookie.jwt) {
      return res.status(204).json({ message: 'No content' });
    }
    // req.logout(function (err) {
    //   if (err) { return next(err); }
    // });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: false });
    res.json({
      success: true,
    });
  };


  public sendMailResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const data = await this.authRepo.sendMail(email);
    res.json({
      success: true,
    });
  }

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    const email = req.body.email;
    const password = req.body.password;
    const user: any = await this.authRepo.resetPassword({ email, token, password })
    if (user.success == false) {
      return res.json(user);
    }
    const { token: accessToken } = await this.userRepo.signToken(
      {
        id: user.id.toString(),
        username: user.name,
        email: user.email,
        code: user.code,
        role: user.department_id,
        position: user.position
      },
      this.timeAccessTokenExpired
    );
    const { token: refreshToken } = await this.userRepo.signToken(
      {
        id: user.id.toString(),
        username: user.name,
        email: user.email,
        code: user.code,
        role: user.department_id,
        position: user.position
      },
      this.timeRefreshTokenExpired
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      // maxAge: 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    req.user = <any>user;
    res.status(200).json({ user, success: true, refreshToken, accessToken });
  }

  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const test = await this.authRepo.changePassword({
      email: req.body.email,
      password: req.body.password,
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword,
    });
 
    res.status(200).json(test);
  }
}
