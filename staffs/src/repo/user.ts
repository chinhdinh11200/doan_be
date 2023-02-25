import * as crypto from 'crypto';
import { types } from '../common';
import BaseRepository from './_base';
import { DB } from '../models';

export default class UserRepository extends BaseRepository {
  public readonly model: DB['User'];
  constructor(db: DB) {
    super(db);

    this.model = db.User;
  }

  public findOneById = async (id: string | number) => {
    const user = await this.model.findByPk(id);

    return user?.dataValues;
  };

  public create = async (data: types.user.UserCreateParam) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const user = await this.model.create(
        {
          department_id: data.department_id,
          name: data.name,
          email: data.email,
          code: data.code,
          ...this.hashPassword(data.password),
          birthday: data.birthday,
          position: data.position,
          degree: data.degree,
          number_salary: data.number_salary,
          income: data.income,
          time_per_year: 0,
          time_reserve: 0,
        },
        { transaction }
      );
      await transaction.commit();

      return user.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  public update = async (
    userId: number | string,
    data: types.user.UserUpdateParam
  ) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const user = await this.model.findByPk(userId);
      if (user === null) {
        throw new Error();
      }
      const userUpdate = await user.update(
        {
          department_id: data.department_id,
          name: data.name,
          code: data.code,
          birthday: data.birthday,
          position: data.position,
          degree: data.degree,
          number_salary: data.number_salary,
          income: data.income,
          time_per_year: data.time_per_year,
          time_reserve: data.time_reserve,
        },
        { transaction }
      );
      await transaction.commit();

      return userUpdate.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  public delete = async (userId: number | string) => {
    try {
      const userDelete = await this.model.destroy({ where: { id: userId } });
      return userDelete;
    } catch (error) {
      throw error;
    }
  };

  // public hashPassword = (password: string) => {
  //   const salt = crypto.randomBytes(16).toString('hex');
  //   const hashPassword = crypto.createHmac("sha256", salt).update(password).digest('hex');

  //   return {
  //     salt,
  //     password: hashPassword,
  //   }
  // }
}
