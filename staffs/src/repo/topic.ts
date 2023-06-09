import { FindAndCountOptions, Op, Sequelize, WhereOptions, where, literal, fn, col } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TotalTime, TypeRoleUser } from '../common/factory/_common';
import { RoleUser } from '../models/role_user';

export default class Topic extends BaseRepository {
  private readonly model: DB['Topic'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelYear: DB['Year'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Topic;
    this.modelRole = db.Role;
    this.modelUser = db.User;
    this.modelYear = db.Year;
    this.modelRoleAble = db.RoleAble;
    this.modelRoleUser = db.RoleUser;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };

  public detail = async (id: string | number) => {
    const topic = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'type'], as: 'role_user',
            where: {
              type_role: 1
            }
          },
          attributes: ['id', 'name'],
          as: 'users',
        },
        {
          model: this.modelYear,
          as: 'year',
          attributes: ['id', 'name'],
        }
      ],
      order: [
        [literal('`users->role_user`.`type`'), 'ASC']
      ]
    });
    const data = {
      ...topic?.dataValues
    }

    return data;
  };

  public search = async (params: types.topic.TopicSearchParam) => {
    const findOption: FindAndCountOptions = {};
    if (params !== undefined) {
      const andArray: WhereOptions[] = [];
      if (params.search !== undefined) {
        andArray.push(
          this.makeMultipleAmbiguousCondition(params, 'search', ['code', 'name'])
        );
      }
      if (params.user_id !== undefined) {
        findOption.include = [
          {
            model: this.modelUser,
            through: {
              attributes: ['time', 'user_id', 'type', 'type_role'],
              as: 'role_user',
              where: {
                type_role: 1,
                user_id: params.user_id,
              }
            }
          }
        ]
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

      this.setOffsetLimit(findOption, params);
    }

    const topics = this.model.findAndCountAll(findOption);
    return topics;
  };

  public create = async (params: types.topic.TopicCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number = 0;
      var timeMain: number = 0;
      var timeSupport: number = 0;
      var timeMember: number = 0;
      switch (params.level) {
        case 0:
          totalTime = 200;
          timeMain = roleUserArray.length === 1 ? 200 : 150
          timeMember = roleUserArray.length === 1 ? 0 : 50 / (roleUserArray.length - 1)
          break;
        case 1:
          totalTime = 450;
          timeMain = 250;
          timeSupport = 75
          timeMember = 125 / (roleUserArray.length - 2)
          break;
        case 2:
          totalTime = 800;
          timeMain = 400;
          timeSupport = 120
          timeMember = 280 / (roleUserArray.length - 2)
          break;
        default:
      }
      const topic = await this.model.create(
        {
          name: params.name,
          code: params.code,
          level: params.level,
          endDate: params.endDate,
          startDate: params.startDate,
          acceptDate: params.acceptDate,
          result: params.result,
          num_person: roleUserArray.length,
          total_time: totalTime,
          year_id: params.year_id,
        },
        { transaction }
      );
      const role = await this.modelRole.findOne({
        where: {
          type: params.type
        }
      });

      if (role) {
        await this.modelRoleAble.create({
          role_id: role.id,
          role_able_id: topic.dataValues.id,
          type: params.type,
          time: String(totalTime),
        })
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member
          if (index === 0) {
            type = TypeRoleUser.main; await this.modelRoleUser.create({
              role_able_id: topic.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeMain,
            })
          } else if (index === 1 && params.level != 0) {
            type = TypeRoleUser.support
            await this.modelRoleUser.create({
              role_able_id: topic.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeSupport,
            })
          } else {
            await this.modelRoleUser.create({
              role_able_id: topic.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeMember,
            })
          }

        })
      }
      await transaction.commit();

      return topic.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.topic.TopicUpdateParam,
    topicId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const topicUpdate = await this.findById(topicId);
      if (topicUpdate) {
        const roleUser = params.role;
        const roleUserArray: string[] = roleUser.split(',');
        var totalTime: number = 0;
        var timeMain: number = 0;
        var timeSupport: number = 0;
        var timeMember: number = 0;
        switch (params.level) {
          case 0:
            totalTime = 200;
            timeMain = roleUserArray.length === 1 ? 200 : 150
            timeMember = roleUserArray.length === 1 ? 0 : 50 / (roleUserArray.length - 1)
            break;
          case 1:
            totalTime = 450;
            timeMain = 250;
            timeSupport = 75
            timeMember = 125 / (roleUserArray.length - 2)
            break;
          case 2:
            totalTime = 800;
            timeMain = 400;
            timeSupport = 120
            timeMember = 280 / (roleUserArray.length - 2)
            break;
          default:
        }
        const topic = await topicUpdate.update(
          {
            name: params.name,
            code: params.code,
            level: params.level,
            endDate: params.endDate,
            startDate: params.startDate,
            acceptDate: params.acceptDate,
            result: params.result,
            num_person: roleUserArray.length,
            total_time: totalTime,
            year_id: params.year_id,
          },
          { transaction }
        );

        const roleAble = await this.modelRoleAble.findOne({
          where: {
            role_able_id: topicUpdate.id,
            type: params.type,
          }
        });
        roleAble?.set({
          time: String(totalTime)
        })
        roleAble?.save();
        // update trung gian
        if (roleUser !== '') {
          const role = await this.modelRole.findOne({
            where: {
              type: params.type
            }
          });
          // roleUserDelete.
          const object = await this.modelRoleUser.destroy({
            where: {
              role_able_id: topicUpdate.dataValues.id,
              type: TypeRoleUser.member,
              type_role: params.type,
            },
            force: true
          })
          if (role) {
            for (let index = 0; index < roleUserArray.length; index++) {
              const roleUser = roleUserArray[index];
              let type = TypeRoleUser.member;
              let user_id: number;
              if (index === 0) {
                type = TypeRoleUser.main;
                user_id = Number(roleUser);
                const mainRole = await this.modelRoleUser.findOne({
                  where: {
                    role_able_id: topic.dataValues.id,
                    type: TypeRoleUser.main,
                    type_role: params.type,
                  }
                });
                if (mainRole) {
                  mainRole.set({
                    user_id: user_id, time: timeMain,
                    type_role: params.type,
                  })
                  mainRole.save();
                }
              } else if (index === 1 && params.level !== 0) {
                type = TypeRoleUser.support
                user_id = Number(roleUser);
                const supportRole = await this.modelRoleUser.findOne({
                  where: {
                    role_able_id: topic.dataValues.id,
                    type: TypeRoleUser.support
                  }
                });
                if (supportRole) {
                  supportRole.set({
                    user_id: user_id,
                    type_role: params.type,
                    time: timeSupport,
                  })
                  supportRole.save();
                } else {
                  user_id = Number(roleUser);
                  await this.modelRoleUser.create({
                    role_able_id: topic.dataValues.id,
                    user_id: Number(roleUser),
                    type: type,
                    type_role: params.type,
                    time: timeSupport,
                  })
                }
              } else {
                user_id = Number(roleUser);
                await this.modelRoleUser.upsert({
                  role_able_id: topic.dataValues.id,
                  user_id: Number(roleUser),
                  type: type,
                  type_role: params.type,
                  time: timeMember,
                })
              }
            }
          }
        }
        await transaction.commit();

        return topic.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  };
  public delete = async (topicId: number | string) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const topic = await this.model.destroy({
        where: {
          id: topicId,
        },
      });

      await this.modelRoleUser.destroy({
        where: {
          role_able_id: topicId,
        },
        // force: true
      })
      return topic;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (topicId: string | number) => {
    return await this.model.findByPk(topicId);
  };

  public export = async (userId: string | number, yearId?: number | string) => {
    const topics: any = await this.model.findAll({
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'user_id', 'type', 'type_role'],
            as: 'role_user',
            where: {
              type_role: 1,
              user_id: userId,
            },
          },
          required: true,
        }
      ],
      where: {
        year_id: yearId,
      },
      raw: true,
      attributes: ['*',[Sequelize.fn('DATE_FORMAT', Sequelize.col('acceptDate'), '%d/%m/%Y'), 'acceptDate']]
    })

    const topicFormats = topics.map((topic: any) => {
      let type = "Thành viên"
      switch (topic['users.role_user.type']) {
        case 0:
          type = "Chủ trì"
          break;
        case 1:
          type = "Thư ký"
          break;
        default:
          type = "Thành viên"
          break;
      }
      let level = "Nhà nước"
      switch (topic['level']) {
        case 0:
          level = "Cơ sở"
          break;
        case 1:
          level = "Ban"
          break;
        default:
          level = "Nhà nước"
          break;
      }
      let result = "Xuất sắc"
      switch (topic.result) {
        case 0:
          result = "Đạt"
          break;
        case 1:
          result = "Giỏi"
          break;
        default:
          result = "Xuất sắc"
          break;
      }

      return {
        ...topic,
        type: type,
        level: level,
        result: result,
      }
    })

    return topicFormats;
  }
}
