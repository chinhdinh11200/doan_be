import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class MarkRepository extends BaseRepository {
  private readonly model: DB['Mark'];
  private readonly modelSubject: DB['Subject'];
  private readonly modelUser: DB['User'];
  constructor(db: DB) {
    super(db);

    this.model = db.Mark;
    this.modelSubject = db.Subject;
    this.modelUser = db.User;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };

  public detail = async (id: string | number) => {
    const data = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelSubject,
        },
        {
          model: this.modelUser,
        }
      ]
    })
  }

  public search = async (params: types.mark.MarkSearchParam) => {
    const findOption: FindAndCountOptions = {
      include: [
        {
          model: this.modelSubject,
          as: 'subject',
        },
        {
          model: this.modelUser,
          as: 'user',
        }
      ],
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

    const marks = await this.model.findAndCountAll(findOption);
    return marks;
  };

  public create = async (params: types.mark.MarkCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      var factor: number;
      switch (params.type) {
        case 0:
          factor = 0.05
          break;
        case 1:
          factor = 0.125
          break;
        case 2:
          factor = 0.25
          break;
        default:
          factor = 0;
          break;
      }
      const mark = await this.model.create(
        {
          subject_id: params.subject_id,
          user_id: params.user_id,
          form_mark: params.form_mark,
          type: params.type,
          num_exam: params.num_exam,
          date_exam: params.date_exam,
          semester: params.semester,
          factor: factor,
        },
        { transaction }
      );
      await transaction.commit();

      return mark.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.mark.MarkUpdateParam,
    markId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      var factor: number;
      switch (params.type) {
        case 0:
          factor = 0.05
          break;
        case 1:
          factor = 0.125
          break;
        case 2:
          factor = 0.25
          break;
        default:
          factor = 0;
          break;
      }
      const markUpdate = await this.findById(markId);
      if (markUpdate) {
        const mark = await markUpdate.update(
          {
            subject_id: params.subject_id,
            user_id: params.user_id,
            form_mark: params.form_mark,
            type: params.type,
            num_exam: params.num_exam,
            date_exam: params.date_exam,
            semester: params.semester,
            factor: factor,
          },
          { transaction }
        );
        await transaction.commit();

        return mark.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (markId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const mark = this.model.destroy({
        where: {
          id: markId,
        },
      });

      return mark;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (markId: string | number) => {
    return await this.model.findByPk(markId);
  };
}
