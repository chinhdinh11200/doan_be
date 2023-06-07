import { FindAndCountOptions, Op, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { codeFee, codeHVMM } from '../common/constant';
import subject from '../app/routes/subject';

export default class Subject extends BaseRepository {
  private readonly model: DB['Subject'];
  private readonly modelMark: DB['Mark'];
  private readonly modelExam: DB['Exam'];
  private readonly modelRoom: DB['Room'];
  constructor(db: DB) {
    super(db);

    this.model = db.Subject;
    this.modelExam = db.Exam;
    this.modelMark = db.Mark;
    this.modelRoom = db.Room;
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

  public export = async (userId: string | number) => {
    const subjectSemesterOnes: any = await this.model.findAll({
      include: [
        {
          model: this.modelExam,
          as: 'exams',
          where: {
            semester: 1,
            user_id: userId,
          },
          required: false,
        },
        {
          model: this.modelMark,
          as: 'marks',
          where: {
            semester: 1,
            user_id: userId,
          },
          required: false,
        },
        {
          model: this.modelRoom,
          as: 'rooms',
          where: {
            semester: 1,
            user_id: userId,
          },
          required: false,
        },
      ],
      where: literal(`
        EXISTS (
          SELECT marks.id FROM marks WHERE subject.id = marks.subject_id AND marks.user_id = ${userId} AND marks.semester = 1
        )
        OR EXISTS (
          SELECT rooms.id FROM rooms WHERE subject.id = rooms.subject_id AND rooms.user_id = ${userId} AND rooms.semester = 1
        )
        OR EXISTS (
          SELECT exams.id FROM exams WHERE subject.id = exams.subject_id AND exams.user_id = ${userId} AND exams.semester = 1
        )
      `),
      // raw: true
    })
    const subjectSemesterTwos: any = await this.model.findAll({
      include: [
        {
          model: this.modelExam,
          where: {
            user_id: userId,
            semester: 2
          },
          as: 'exams',
          required: false,
        },
        {
          model: this.modelMark,
          where: {
            user_id: userId,
            semester: 2
          },
          as: 'marks',
          required: false,
        },
        {
          model: this.modelRoom,
          where: {
            user_id: userId,
            semester: 2
          },
          as: 'rooms',
          required: false,
        },
      ],
      where: literal(`
        EXISTS (
          SELECT marks.id FROM marks WHERE subject.id = marks.subject_id AND marks.user_id = ${userId} AND marks.semester = 2
        )
        OR EXISTS (
          SELECT rooms.id FROM rooms WHERE subject.id = rooms.subject_id AND rooms.user_id = ${userId} AND rooms.semester = 2
        )
        OR EXISTS (
          SELECT exams.id FROM exams WHERE subject.id = exams.subject_id AND exams.user_id = ${userId} AND exams.semester = 2
        )
      `),
      // raw: true
    })

    // const subjectOneHVMMFormats = subjectSemesterOnes.map((subject: any) => {
    //   let endSemester: string = '';
    //   let time: number = 0;
    //   if (subject.exams !== undefined) {
    //     endSemester += 'Ra đề, ';
    //     subject.exams.map((exam: any) => {
    //       time += exam.num_exam * exam.factor;
    //     })
    //   }
    //   if (subject.rooms !== undefined) {
    //     endSemester += 'coi thi, ';
    //     subject.rooms.map((room: any) => {
    //       time += room.num_exam_session * room.factor;
    //     })
    //   }
    //   if (subject.marks !== undefined) {
    //     endSemester += 'chấm thi';
    //     subject.exams.map((exam: any) => {
    //       time += exam.num_exam * exam.factor;
    //     })
    //   }

    //   return {
    //     ...subject.dataValues,
    //     endSemester,
    //     time : Math.ceil(time),
    //   }
    // });
    const subjectOneFeeFormats = subjectSemesterOnes.map((subject: any) => {
      let endSemester: string = '';
      let time: number = 0;
      if (subject.exams.length > 0) {
        endSemester += 'Ra đề, ';
        subject.exams.map((exam: any) => {
          time += exam.num_exam * exam.factor;
        })
      }
      if (subject.rooms.length > 0) {
        endSemester += 'coi thi, ';
        subject.rooms.map((room: any) => {
          time += room.num_exam_session * room.factor;
        })
      }
      if (subject.marks.length > 0) {
        endSemester += 'chấm thi';
        subject.marks.map((mark: any) => {
          time += mark.num_exam * mark.factor;
        })
      }

      return {
        ...subject.dataValues,
        time: time,
        endSemester,
      }
    });

    // const subjectTwoHVMMFormats = subjectSemesterTwos.map((subject: any) => {
    //   let endSemester: string = '';
    //   let time: number = 0;
    //   if (subject.exams.length > 0) {
    //     endSemester += 'Ra đề, ';
    //     subject.exams.map((exam: any) => {
    //       time += exam.num_exam * exam.factor;
    //     })
    //   }
    //   if (subject.rooms.length > 0) {
    //     endSemester += 'coi thi, ';
    //     subject.rooms.map((room: any) => {
    //       time += room.num_exam_session * room.factor;
    //     })
    //   }
    //   if (subject.marks.length > 0) {
    //     endSemester += 'chấm thi';
    //     subject.exams.map((exam: any) => {
    //       time += exam.num_exam * exam.factor;
    //     })
    //   }

    //   return {
    //     ...subject.dataValues,
    //     endSemester,
    //     time : Math.ceil(time),
    //   }
    // });
    
    let subjectTwoFeeFormats: any[]= subjectSemesterTwos.map((subject: any) => {
      let endSemester: string = '';
      let time: number = 0;
      if (subject.exams.length > 0) {
        endSemester += 'Ra đề, ';
        subject.exams.map((exam: any) => {
          time += exam.num_exam * exam.factor;
        })
      }
      if (subject.rooms.length > 0) {
        endSemester += 'coi thi, ';
        subject.rooms.map((room: any) => {
          time += room.num_exam_session * room.factor;
        })
      }
      if (subject.marks.length > 0) {
        endSemester += 'chấm thi';
        subject.exams.map((exam: any) => {
          time += exam.num_exam * exam.factor;
        })
      }

      return {
        ...subject.dataValues,
        time : Math.ceil(time),
        endSemester,
      }
    });
    return {
      // subjectOneHVMMFormats,
      subjectOneFeeFormats,
      // subjectTwoHVMMFormats,
      subjectTwoFeeFormats,
    }
  }
}
