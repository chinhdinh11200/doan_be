import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Invention extends BaseRepository {
  private readonly model: DB['Invention'];
  constructor(db: DB) {
    super(db);

    this.model = db.Invention;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };
  public search = async (params: types.invention.InventionSearchParam) => {
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


    const inventions = this.model.findAndCountAll(findOption);
    return inventions;
  };
  public create = async (params: types.invention.InventionCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const invention = await this.model.create(
        {
          name: params.name,
          code: params.code,
          level: params.level,
          num_person: params.num_person,
          total_time: params.total_time,
          date_recognition: params.date_recognition,
          number_recognition: params.number_recognition,
        },
        { transaction }
      );
      await transaction.commit();

      return invention.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.invention.InventionUpdateParam,
    inventionId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const inventionUpdate = await this.findById(inventionId);
      if (inventionUpdate) {
        const invention = await inventionUpdate.update(
          {
            name: params.name,
            code: params.code,
            level: params.level,
            num_person: params.num_person,
            total_time: params.total_time,
            date_recognition: params.date_recognition,
            number_recognition: params.number_recognition,
          },
          { transaction }
        );
        await transaction.commit();

        return invention.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (inventionId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const invention = this.model.destroy({
        where: {
          id: inventionId,
        },
      });

      return invention;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (inventionId: string | number) => {
    return await this.model.findByPk(inventionId);
  };
}
