import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class ExamRepository extends BaseRepository {
  private readonly model: DB['Time'];
  constructor(db: DB) {
    super(db);

    this.model = db.Time;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };
  public search = async (params: types.exam.ExamSearchParam) => {
    const findOption: FindAndCountOptions = {
      include: [],
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
        findOption.order = [['id', 'ASC']];
      }
    const times = await this.model.findAndCountAll(findOption);

    return times;
  };
}
