import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class YearRepository extends BaseRepository {
  private readonly model: DB['Year'];
  constructor(db: DB) {
    super(db);

    this.model = db.Year;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };

  public search = async (params: types.year.YearSearchParam) => {
    const findOption: FindAndCountOptions = {
      include: [],
    };

    if (params !== undefined) {
      const andArray: WhereOptions[] = [];
      if (params.search !== undefined) {
        andArray.push(
          this.makeMultipleAmbiguousCondition(params, 'search', ['code'])
        );
      }
      if (params.name) {
        andArray.push(
          this.makeAmbiguousCondition(params, 'name')
        )
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


    const year = await this.model.findAndCountAll(findOption);
    return year;
  };

  public create = async (params: types.year.YearCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      let name = ''
      switch (params.semester) {
        case '0':
          name += 'Học kỳ 1 - ' + params.name
          break;
        case '1':
          name += 'Học kỳ 2 - ' + params.name
          break;
        default:
          break;
      }
      const year = await this.model.create(
        {
          name: name,
          startDate: params.startDate,
          endDate: params.endDate,
          semester: params.semester,
        },
        { transaction }
      );
      await transaction.commit();

      return year;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.year.YearUpdateParam,
    yearId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const yearUpdate = await this.findById(yearId);
      if (yearUpdate) {
        let name = ''
        switch (params.semester) {
          case '0':
            name += 'Học kỳ 1 - ' + params.name
            break;
          case '1':
            name += 'Học kỳ 2 - ' + params.name
            break;
          default:
            break;
        }
        const year = await yearUpdate.update(
          {
            name: name,
            startDate: params.startDate,
            endDate: params.endDate,
            semester: params.semester,
          },
          { transaction }
        );
        await transaction.commit();

        return year.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (yearId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const year = this.model.destroy({
        where: {
          id: yearId,
        },
      });

      return year;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (yearId: string | number) => {
    return await this.model.findOne({
      where: { id: yearId },
    });
  };
}
