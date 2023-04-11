import * as crypto from 'crypto';
import { types } from '../common';
import BaseRepository from './_base';
import { DB } from '../models';
import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { log } from 'console';

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

  public search = async (params?: types.user.UserSearchParam) => {
    // this.makeAmbiguousCondition(params, 'name');
    const findOption: FindAndCountOptions = {
      include: [],
    };
    
    this.setOffsetLimit(findOption, params);
    if (params !== undefined) {
      const andArray: WhereOptions[] = [];
      if (params.search !== undefined) {
        andArray.push(
          this.makeMultipleAmbiguousCondition(params, 'search', [
            'code',
            'name',
          ])
        );
      }
      if (params.name !== undefined) {
        andArray.push(this.makeAmbiguousCondition(params, 'name'));
      }

      if (params.email !== undefined) {
        andArray.push(this.makeAmbiguousCondition(params, 'email'));
      }

      findOption.where = {
        [Op.and]: andArray,
      };

      if (params.sort !== undefined) {
        if (`${params.sort}`.toLowerCase() === 'desc') {
          findOption.order = [
            [params.sortColumn ? params.sortColumn : 'createdAt', 'DESC']
          ];
        } else {
          findOption.order = [
            [params.sortColumn ? params.sortColumn : 'createdAt', 'ASC']
          ];
        }
      } else {
        findOption.order = [['createdAt', 'DESC']];
      }
    }

    return this.model.findAndCountAll(findOption);
  };
}
