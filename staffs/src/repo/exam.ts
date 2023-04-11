import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class ExamRepository extends BaseRepository {
  private readonly model: DB['Exam'];
  private readonly modelUser: DB['User'];
  constructor(db: DB) {
    super(db);

    this.model = db.Exam;
    this.modelUser = db.User;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };
  public search = async (params: types.exam.ExamSearchParam) => {
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


    const exams = await this.model.findAndCountAll(findOption);
    return exams;
  };

  public create = async (params: types.exam.ExamCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const exam = await this.model.create(
        {
          user_id: params.user_id,
          semester_id: params.semester_id,
          subject_id: params.subject_id,
          name: params.name,
          code: params.code,
          form_exam: params.form_exam,
          time_work: params.time_work,
          type: params.type,
          number_question: params.number_question,
          num_code: params.num_code,
        },
        { transaction }
      );
      await transaction.commit();

      return exam.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.exam.ExamUpdateParam,
    examId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const examUpdate = await this.findById(examId);
      if (examUpdate) {
        const exam = await examUpdate.update(
          {
            user_id: params.user_id,
            semester_id: params.semester_id,
            subject_id: params.subject_id,
            name: params.name,
            code: params.code,
            form_exam: params.form_exam,
            time_work: params.time_work,
            type: params.type, 
            number_question: params.number_question,
            num_code: params.num_code,
          },
          { transaction }
        );
        await transaction.commit();

        return exam.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (examId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const exam = this.model.destroy({
        where: {
          id: examId,
        },
      });

      return exam;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (examId: string | number) => {
    return await this.model.findByPk(examId);
  };
}
