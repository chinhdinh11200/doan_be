import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Education extends BaseRepository {
  private readonly model: DB['Education'];
  constructor(db: DB) {
    super(db);

    this.model = db.Education;
  }

  public search = async (params: types.education.EducationSearchParam) => {
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


    const educations = this.model.findAndCountAll(findOption);
    return educations;
  };
  public create = async (params: types.education.EducationCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const education = await this.model.create(
        {
          name: params.name,
          code: params.code,
          num_credit: params.num_credit,
          num_person: params.num_person,
          total_time: params.total_time,
          form_construction: params.form_construction,
          num_decision: params.num_decision,
          date_decision: params.date_decision,
        },
        { transaction }
      );
      await transaction.commit();

      return education.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.education.EducationUpdateParam,
    educationId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const educationUpdate = await this.findById(educationId);
      if (educationUpdate) {
        const education = await educationUpdate.update(
          {
            name: params.name,
            code: params.code,
            num_credit: params.num_credit,
            num_person: params.num_person,
            total_time: params.total_time,
            form_construction: params.form_construction,
            num_decision: params.num_decision,
            date_decision: params.date_decision,
          },
          { transaction }
        );
        await transaction.commit();

        return education.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (educationId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const education = this.model.destroy({
        where: {
          id: educationId,
        },
      });

      return education;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (educationId: string | number) => {
    return await this.model.findByPk(educationId);
  };
}
