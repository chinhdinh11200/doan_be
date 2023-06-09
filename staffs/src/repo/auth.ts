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

  public register = async () => { };

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
      await this.modelToken.destroy({
        where: {
          email: email,
        },
        force: true
      })
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
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "chinhdinhtho@gmail.com",
        pass: "irbjfhdffwfomuzq",
      },
      // auth: {
      //   user: testMail.user,
      //   pass: testMail.pass,
      // },
    });

    let info = await transporter.sendMail({
      from: 'chinhdinhtho@gmail.com', // sender address
      to: email, // list of receivers
      subject: '', // Subject line
      text: '', // plain text body
      html: `
      <!doctype html>
      <html lang="en-US">
      
      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                                  <img width="500" src="https://viettrade.cssdemoco.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftop-logo.ac30ac39.png&w=1080&q=75" title="logo" alt="logo">
                                </a>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Bạn đã yêu cầu đặt lại mật khẩu của mình</h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">Chúng tôi không thể chỉ gửi cho bạn mật khẩu cũ của bạn. Một liên kết duy nhất để đặt lại mật khẩu của bạn đã được tạo cho bạn. Để đặt lại mật khẩu của bạn, hãy nhấp vào liên kết sau và làm theo hướng dẫn. </p>
                                              <a href="http://localhost:5173/reset-password?token=${token.token}"
                                                  style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Đặt lại mật khẩu</a>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong></strong></p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <!--/100% body table-->
      </body>
      </html>`
      // http://localhost:5173/add-class
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
        // email: params.email,
        token: params.token,
      },
    });
    if (token === null) {
      throw new Error('Token is invalid');
    }

    let user = await this.model.findOne({
      where: {
        email: token.email,
      },
    });
    if (user === null) {
      return { success: false, message: 'User not found' };
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
