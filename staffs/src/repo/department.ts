import {
  FindAndCountOptions,
  Op,
  WhereAttributeHash,
  WhereOptions,
  literal,
} from 'sequelize';
import { types } from '../common';
import BaseRepository from './_base';
import { DB } from '../models';

export default class DepartmentRepository extends BaseRepository {
  public readonly model: DB['Department'];
  public readonly modelUser: DB['User'];

  constructor(db: DB) {
    super(db);
    this.model = db.Department;
    this.modelUser = db.User;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };
  
  public search = async (params: types.department.DepartmentSearchParam) => {
    // this.makeAmbiguousCondition(data, 'name');
    const findOption: FindAndCountOptions = {
      include: [this.modelUser],
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

    return this.model.findAndCountAll(findOption);
  };

  public create = async (data: types.department.DepartmentCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const department = await this.model.create(
        {
          name: data.name,
          code: data.code,
        },
        { transaction }
      );
      await transaction.commit();

      return department.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  public update = async (
    id: string | number,
    data: types.department.DepartmentUpdateParam
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const department = await this.model.findByPk(id);

      const departmentUpdate = await department?.update({
        name: data.name,
        code: data.code,
      });
      await transaction.commit();

      return departmentUpdate;
    } catch (error) {
      await transaction.rollback;
      throw error;
    }
  };

  public delete = async (departmentId: number | string) => {
    try {
      const departmentDelete = await this.model.destroy({
        where: {
          id: departmentId,
        },
      });

      return departmentDelete;
    } catch (error) {
      throw error;
    }
  };
}
