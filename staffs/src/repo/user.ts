import * as crypto from 'crypto';
import { types } from '../common';
import BaseRepository from './_base';
import { DB } from '../models';
import { FindAndCountOptions, Op, WhereOptions, col } from 'sequelize';
import { addBaseUrlToData } from '../utils';
import * as repository from './index';

export default class UserRepository extends BaseRepository {
  public readonly model: DB['User'];
  public readonly modelDepartment: DB['Department'];
  public readonly modelClasses: DB['Classes'];
  private readonly topicRepo: repository.Topic
  private readonly articleRepo: repository.Article
  private readonly bookRepo: repository.Book
  private readonly compilationRepo: repository.Compilation
  private readonly educationRepo: repository.Education
  private readonly inventionRepo: repository.Invention
  private readonly scientificRepo: repository.Scientific
  private readonly thesisRepo: repository.Thesis
  private readonly subjectRepo: repository.Subject
  constructor(db: DB) {
    super(db);

    this.model = db.User;
    this.modelDepartment = db.Department;
    this.modelClasses = db.Classes;
    
    // this.userRepo = new repository.User(db);
    this.topicRepo = new repository.Topic(db);
    this.articleRepo = new repository.Article(db);
    this.bookRepo = new repository.Book(db);
    this.compilationRepo = new repository.Compilation(db);
    this.educationRepo = new repository.Education(db);
    this.inventionRepo = new repository.Invention(db);
    this.scientificRepo = new repository.Scientific(db);
    this.thesisRepo = new repository.Thesis(db);
    this.subjectRepo = new repository.Subject(db);
  }

  public findOneById = async (id: string | number) => {
    let user = await this.model.findByPk(id);
    // user = addBaseUrlToData(user, 'avatar')

    return user;
  };

  public detail = async (id: string | number, yearId?: number| string) => {
    let user: any = await this.model.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: this.modelDepartment,
          attributes: [[col('name'), 'departmentName']],
          as: 'department'
        }
      ]
    });

    let timeTeach = 0;
    let timeScient = 0;

    
    if (yearId != undefined) {
      const dataTeachMiddle = await this.modelClasses.findAll({
        attributes: ['name', 'code', 'num_student', 'semester', 'num_credit', 'num_lesson', 'exam_supervision', 'exam_create', 'marking', 'form_exam'],
        where: {
          user_id: id,
          year_id: yearId,
        },
        raw: true,
      })

      let dataTeachMiddleWithTime = dataTeachMiddle.map(classs => {
        let time = classs.num_lesson
        let middleSemester = ''
        let timeMiddle = 0;
        if (classs.num_student > 40 && classs.num_student <= 50) {
          time = time * 1.1
        } else if (classs.num_student > 50 && classs.num_student <= 65) {
          time *= 1.2
        } else if (classs.num_student > 65 && classs.num_student <= 80) {
          time *= 1.3
        } else if (classs.num_student > 80 && classs.num_student <= 100) {
          time *= 1.4
        } else if (classs.num_student > 100) {
          time *= 1.5
        }
  
        if (classs.exam_create) {
          middleSemester += 'Ra đề, '
          timeMiddle += 1;
        }
  
        if (classs.exam_supervision) {
          middleSemester += 'coi thi, '
          timeMiddle += 1;
        }
  
        if (classs.marking) {
          middleSemester += 'chấm thi, '
          switch (classs.form_exam) {
            case 0:
              timeMiddle += classs.num_student * 0.05;
              break;
            case 1:
              timeMiddle += classs.num_student * 0.05;
              break;
            case 2:
              timeMiddle += classs.num_student * 0.125;
              break;
          }
        }
  
        // if (classs.form_exam !== null) {
        switch (classs.form_exam) {
          case 0:
            middleSemester += 'TL'
            break;
          case 1:
            middleSemester += 'TN'
            break;
          case 2:
            middleSemester += 'VĐ'
            break;
          // }
        }
  
        return {
          ...classs,
          time : Math.ceil(time),
          middleSemester,
          timeMiddle : Math.ceil(timeMiddle),
        }
      })
  
      timeTeach = timeTeach + dataTeachMiddleWithTime.reduce((acc, curr) => acc + curr.timeMiddle, 0);
      timeTeach = timeTeach + dataTeachMiddleWithTime.reduce((acc, curr) => acc + curr.time, 0);
  
      // console.log(timeTeach, "no_thesis");
      const subjects = await this.subjectRepo.export(id, yearId,);
      const thesis = await this.thesisRepo.export(id, yearId,);
      
      timeTeach += subjects?.subjectOneFeeFormats.reduce((acc: any, curr: any) => acc + curr.time, 0);
      timeTeach += subjects?.subjectTwoFeeFormats.reduce((acc: any, curr: any) => acc + curr.time, 0);
      timeTeach = thesis?.reduce((acc: any, curr: any) => {
        // console.log(typeof curr['users.thesis_user.time'], curr['users.thesis_user.time']);
        return acc + Number(curr['users.thesis_user.time']);
      }, 0);
      
      const topics = await this.topicRepo.export(id, yearId,);
      const articles = await this.articleRepo.export(id, yearId,);
      const books = await this.bookRepo.export(id, yearId,);
      const inventions = await this.inventionRepo.export(id, yearId,);
      const compilations = await this.compilationRepo.export(id, yearId,);
      const educations = await this.educationRepo.export(id, yearId,);
      const scientifics = await this.scientificRepo.export(id, yearId,);
  
      timeScient += topics?.reduce((acc: any, curr: any) => acc + curr['users.role_user.time'], 0);
      timeScient += articles?.reduce((acc: any, curr: any) => acc + curr['users.role_user.time'], 0);
      timeScient += books?.reduce((acc: any, curr: any) => acc + curr['users.role_user.time'], 0);
      timeScient += inventions?.reduce((acc: any, curr: any) => acc + curr['users.role_user.time'], 0);
      timeScient += compilations?.reduce((acc: any, curr: any) => acc + curr['users.role_user.time'], 0);
      timeScient += educations?.reduce((acc: any, curr: any) => acc + curr['users.role_user.time'], 0);
      timeScient += scientifics?.reduce((acc: any, curr: any) => acc + curr['users.role_user.time'], 0);
    }
    
    return {
      ...user?.dataValues,
      departmentName: user?.department.name,
      timeTeach,
      timeScient
    };
  }

  public create = async (data: types.user.UserCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    const userExists = await this.model.findOne({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      await transaction.rollback();
      throw new Error('User already exists');
    }
    try {
      const user = await this.model.create(
        {
          department_id: data.department_id,
          name: data.name,
          avatar: data.avatar,
          email: data.email,
          code: data.code,
          ...this.hashPassword(data.password),
          birthday: data.birthday,
          position: data.position,
          degree: data.degree,
          number_salary: data.number_salary,
          income: data.income,
          time_per_year: 0,
          time_reserve: 0,
        },
        { transaction }
      );
      await transaction.commit();

      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  public update = async (
    userId: number | string,
    data: types.user.UserUpdateParam
  ) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const user = await this.model.findByPk(userId);
      if (user === null) {
        throw new Error();
      }
      const userUpdate = await user.update(
        {
          department_id: data.department_id,
          name: data.name,
          code: data.code,
          avatar: data.avatar,
          email: data.email,
          ...this.hashPassword(data.password),
          birthday: data.birthday,
          position: data.position,
          degree: data.degree,
          number_salary: data.number_salary,
          income: data.income,
          time_per_year: data.time_per_year,
          time_reserve: data.time_reserve,
        },
        { transaction }
      );
      await transaction.commit();

      return userUpdate;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  public delete = async (userId: number | string) => {
    try {
      const userDelete = await this.model.destroy({ where: { id: userId } });
      return userDelete;
    } catch (error) {
      throw error;
    }
  };

  public search = async (params?: types.user.UserSearchParam) => {
    // this.makeAmbiguousCondition(params, 'name');
    const findOption: FindAndCountOptions = {
      include: [
        {
          model: this.modelDepartment,
          attributes: [[col('name'), 'departmentName']],
          as: 'department'
        }
      ],
    };

    this.setOffsetLimit(findOption, params);
    if (params !== undefined) {
      const andArray: WhereOptions[] = [
        {
          id: {
            [Op.not]: 1,
          }
        }
      ];
      if (params.search !== undefined) {
        andArray.push(
          this.makeMultipleAmbiguousCondition(params, 'search', [
            'code',
            'name',
          ])
        );
      }
      if (params.name) {
        andArray.push(this.makeAmbiguousCondition(params, 'name'));
      }

      if (params.email !== undefined) {
        andArray.push(this.makeAmbiguousCondition(params, 'email'));
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
}
