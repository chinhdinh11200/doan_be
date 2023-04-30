import crypto from 'crypto';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';
import { types } from '../common';
import { DB } from '../models';
import BaseRepository from './_base';

export class AuthRepository extends BaseRepository {
  public readonly model: DB['User'];
  public readonly modelToken: DB['Token'];
  constructor(db: SQLize) {
    super(db);

    this.model = db.User;
    this.modelToken = db.Token;
  }

  public register = async () => {};

  public login = async (data: types.user.UserLoginParam) => {
    const user = await this.model.findOne({
      where: {
        [Op.or]: {
          code: data.username,
          email: data.username,
        },
      },
    });

    if (user !== null) {
      const { password: hashPassword } = this.hashPassword(
        data.password,
        user.salt
      );
      if (user.password === hashPassword) {
        return user;
      }
    } else {
      // throw new Error();
      return false;
    }

    return false;
  };

  public sendMail = async (email: string) => {
    const transaction = await this.db.sequelize.transaction();
    let token;
    try {
      token = await this.modelToken.create(
        {
          email,
          token: crypto.randomBytes(16).toString('hex'),
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
    if (!token) {
      throw new Error();
    }
    let testMail = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testMail.user,
        pass: testMail.pass,
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'chinhdinhtho@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: token.token, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  };

  public resetPassword = async (params: {
    token: string;
    email: string;
    password: string;
  }) => {
    const token = await this.modelToken.findOne({
      where: {
        email: params.email,
        token: params.token,
      },
    });
    if (token === null) {
      throw new Error('Token is invalid');
    }

    let user = await this.model.findOne({
      where: {
        email: params.email,
      },
    });
    if (user === null) {
      throw new Error('Email is in valid');
    }

    const { salt, password } = this.hashPassword(params.password);
    let userResetPassword = await user.update({
      password,
      salt,
    });
    return userResetPassword.dataValues;
  };

  public changePassword = async (params: types.user.ChangePasswordParam) => {
    const user = await this.model.findOne({
      where: {
        email: params.email,
      },
    });
    if (user === null) {
      throw new Error();
    }
    const { password: hashPassword } = this.hashPassword(
      params.password,
      user.salt
    );
    if (user.password !== hashPassword) {
      // throw new Error();
    }

    const { salt, password: newPassword } = this.hashPassword(
      params.newPassword
    );
    const userUpdatePassword = await user.update({
      password: newPassword,
      salt: salt,
    });

    return userUpdatePassword.dataValues;
  };

  // public hashPassword = (data: {salt: string, password: string}) => {
  //   return crypto
  //     .createHmac('sha256', data.salt)
  //     .update(data.password)
  //     .digest('hex');
  // }
}
