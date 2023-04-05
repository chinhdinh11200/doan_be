import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Role extends BaseRepository {
  private readonly model: DB['Role'];
  constructor(db: DB) {
    super(db);

    this.model = db.Role;
  }

  public search = async (params: types.role.RoleSearchParam) => {
    // const a: = this.makeMultipleAmbiguousCondition(params, 'search', ['name', 'code']);
    const findOption: FindAndCountOptions = {
      include: [],
    };

    if (params !== undefined) {
      const andArray: WhereOptions[] = [];
      if (params.search !== undefined) {
        andArray.push(
          this.makeMultipleAmbiguousCondition(params, 'search', ['code', 'name'])
        );
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
    const roles = this.model.findAndCountAll(findOption);
    return roles;
  };
  public create = async (params: types.role.RoleCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const role = await this.model.create(
        {
          name: params.name,
          time: params.time,
          type: params.type,
        },
        { transaction }
      );
      await transaction.commit();

      return role.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.role.RoleUpdateParam,
    roleId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUpdate = await this.findById(roleId);
      if (roleUpdate) {
        const role = await roleUpdate.update(
          {
            name: params.name,
            time: params.time,
            type: params.type,
          },
          { transaction }
        );
        await transaction.commit();

        return role.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (roleId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const role = this.model.destroy({
        where: {
          id: roleId,
        },
      });

      return role;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (roleId: string | number) => {
    return await this.model.findByPk(roleId);
  };
}
