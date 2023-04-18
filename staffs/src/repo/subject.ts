import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Subject extends BaseRepository {
  private readonly model: DB['Subject'];
  constructor(db: DB) {
    super(db);

    this.model = db.Subject;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };
  public search = async (params: types.subject.SubjectSearchParam) => {
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

      if (params.name) {
        andArray.push(this.makeAmbiguousCondition(params, 'name'))
      }

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


    const subjects = this.model.findAndCountAll(findOption);
    return subjects;
  };
  public create = async (params: types.subject.SubjectCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const subject = await this.model.create(
        {
          name: params.name,
          code: params.code,
          form_exam: params.form_exam,
        },
        { transaction }
      );
      await transaction.commit();

      return subject;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.subject.SubjectUpdateParam,
    subjectId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const subjectUpdate = await this.findById(subjectId);
      if (subjectUpdate) {
        const subject = await subjectUpdate.update(
          {
            name: params.name,
            code: params.code,
            form_exam: params.form_exam,
          },
          { transaction }
        );
        await transaction.commit();

        return subject.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (subjectId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const subject = this.model.destroy({
        where: {
          id: subjectId,
        },
      });

      return subject;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (subjectId: string | number) => {
    return await this.model.findByPk(subjectId);
  };
}
