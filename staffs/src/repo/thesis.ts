import { FindAndCountOptions, Op, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from '../models';
import BaseRepository from './_base';
import { TypeRoleUser } from '../common/factory/_common';

export default class Scientific extends BaseRepository {
  private readonly model: DB['Thesis'];
  private readonly modelThesisUser: DB['ThesisUser'];
  private readonly modelUser: DB['User'];
  constructor(db: DB) {
    super(db);

    this.model = db.Thesis;
    this.modelThesisUser = db.ThesisUser;
    this.modelUser = db.User;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };

  public detail = async (id: string | number) => {
    const thesis = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'type'], as: 'thesis_user',
          },
          attributes: ['id', 'name'],
        }
      ],
      order: [
        [literal('`users->thesis_user`.`type`'), 'ASC']
      ]
    });

    const data = {
      ...thesis?.dataValues
    }
    return data;
  };

  public search = async (params: types.thesis.ThesisSearchParam) => {
    // const a: = this.makeMultipleAmbiguousCondition(params, 'search', ['name', 'code']);
    const findOption: FindAndCountOptions = {
      include: [],
    };

    if (params !== undefined) {
      const andArray: WhereOptions[] = [];
      if (params.search !== undefined) {
        andArray.push(
          this.makeMultipleAmbiguousCondition(params, 'search', ['num_decision', 'course'])
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
    const thesis = this.model.findAndCountAll(findOption);
    return thesis;
  };

  public create = async (params: types.thesis.ThesisCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number;
      var timeMain: number;
      var timeMember: number;
      switch (params.type) {
        case 0:
          totalTime = 200;
          timeMain = 120 / params.num_year;
          timeMember = 80 / (roleUserArray.length - 1) / params.num_year;
          break;
        case 1:
          totalTime = 35;
          timeMain = 21;
          timeMember = 14 / (roleUserArray.length - 1)
          break;
        case 2:
          totalTime = 25;
          timeMain = 15;
          timeMember = 10 / (roleUserArray.length - 1)
          break;
        case 3:
          totalTime = 33;
          timeMain = 19.5;
          timeMember = 13 / (roleUserArray.length - 1)
          break;
        case 4:
          totalTime = 38;
          timeMain = 22.5;
          timeMember = 15 / (roleUserArray.length - 1)
          break;
        case 5:
          totalTime = 43;
          timeMain = 25.5;
          timeMember = 17 / (roleUserArray.length - 1)
          break;
        case 6:
          totalTime = 50;
          timeMain = 30;
          timeMember = 20 / (roleUserArray.length - 1)
          break;
        default:
          totalTime = 0
          timeMain = 0
          timeMember = 0
          break;
      }

      const thesis = await this.model.create({
        name_student: params.name_student,
        course: params.course,
        num_decision: params.num_decision,
        num_year: params.num_year,
        num_person: roleUserArray.length,
        total_time: totalTime,
        type: params.type,
        year_id: params.year_id,
      }, { transaction });

      if (params.role) {
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member;
          if (index === 0) {
            type = TypeRoleUser.main;
            await this.modelThesisUser.create({
              thesis_id: thesis.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              time: timeMain,
            })
          } else {
            type = TypeRoleUser.member
            await this.modelThesisUser.create({
              thesis_id: thesis.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              time: timeMember,
            })
          }
        })
      }
      await transaction.commit();

      return thesis;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.thesis.ThesisUpdateParam,
    thesisId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number;
      var timeMain: number;
      var timeMember: number;
      switch (params.type) {
        case 0:
          totalTime = 200;
          timeMain = 120;
          timeMember = 80 / (roleUserArray.length - 1)
          break;
        case 1:
          totalTime = 35;
          timeMain = 21;
          timeMember = 14 / (roleUserArray.length - 1)
          break;
        case 2:
          totalTime = 25;
          timeMain = 15;
          timeMember = 10 / (roleUserArray.length - 1)
          break;
        case 3:
          totalTime = 33;
          timeMain = 19.5;
          timeMember = 13 / (roleUserArray.length - 1)
          break;
        case 4:
          totalTime = 38;
          timeMain = 22.5;
          timeMember = 15 / (roleUserArray.length - 1)
          break;
        case 5:
          totalTime = 43;
          timeMain = 25.5;
          timeMember = 17 / (roleUserArray.length - 1)
          break;
        case 6:
          totalTime = 50;
          timeMain = 30;
          timeMember = 20 / (roleUserArray.length - 1)
          break;
        default:
          totalTime = 0
          timeMain = 0
          timeMember = 0
          break;
      }
      const thesisUpdate = await this.model.findByPk(thesisId);
      if (thesisUpdate) {
        const thesis = await thesisUpdate.update({
          name_student: params.name_student,
          course: params.course,
          num_decision: params.num_decision,
          num_year: params.num_year,
          num_person: roleUserArray.length,
          total_time: totalTime,
          type: params.type,
          year_id: params.year_id,
        }, { transaction });
        const object = await this.modelThesisUser.destroy({
          where: {
            thesis_id: thesisUpdate.dataValues.id,
            type: TypeRoleUser.member,
          },
          force: true
        })
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member;
          if (index === 0) {
            type = TypeRoleUser.main;
            const mainRole = await this.modelThesisUser.findOne({
              where: {
                thesis_id: thesisUpdate.dataValues.id,
                type: TypeRoleUser.main,
              }
            });
            if (mainRole) {
              mainRole.set({
                user_id: Number(roleUser),
                time: timeMain,
              })
              mainRole.save();
            }
          } else {
            type = TypeRoleUser.member
            await this.modelThesisUser.upsert({
              thesis_id: thesis.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              time: timeMember,
            })
          }
        })
        await transaction.commit();
        return thesis;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (thesisId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const thesis = this.model.destroy({
        where: {
          id: thesisId,
        },
      });
      return thesis;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (thesisId: string | number) => {
    return await this.model.findByPk(thesisId);
  };
  
  public export = async (userId: string | number) => {
    const thesis: any = await this.model.findAll({
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'type'],
            where: {
              user_id: userId,
            },
            as: 'thesis_user'
          }
        }
      ],
      raw: true,
    })

    const thesisFormats = thesis.map((ths: any) => {
      let type = "Thành viên"
      switch (ths['users.thesis_user.type']) {
        case 0:
          type = "HD chính"
          break;
        default:
          type = "HD phụ"
          break;
      }

      return {
        ...ths,
        type: type,
      }
    })

    return thesisFormats;
  }
}
