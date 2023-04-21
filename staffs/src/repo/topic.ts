import { FindAndCountOptions, Op, Sequelize, WhereOptions, where, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TotalTime, TypeRoleUser } from '../common/factory/_common';
import { Fn } from 'sequelize/types/utils';
import { RoleUser } from '../models/role_user';

export default class Topic extends BaseRepository {
  private readonly model: DB['Topic'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Topic;
    this.modelRole = db.Role;
    this.modelUser = db.User;
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
          through: { attributes: ['time', 'type'], as: 'role_user', },
          attributes: ['id', 'name'],
          // as: 'role_user',
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

    const topics = this.model.findAndCountAll(findOption);
    return topics;
  };
  public create = async (params: types.topic.TopicCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
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
          total_time: TotalTime.topic,
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
          time: String(params.total_time),
        })
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member;
          let time: number = TypeRoleUser.member;
          if (index === 0) {
            type = TypeRoleUser.main;
            time = 400;
          } else if (index === 1) {
            type = TypeRoleUser.support
            time = 120;
          } else {

            time = 280 / (roleUserArray.length - 2)
          }
          // console.log("ROLE", time, type, roleUserArray.length);
          await this.modelRoleUser.create({
            role_able_id: topic.dataValues.id,
            user_id: Number(roleUser),
            type: type,
            time: String(time),
          })
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
        const topic = await topicUpdate.update(
          {
            name: params.name,
            code: params.code,
            level: params.level,
            endDate: params.endDate,
            startDate: params.startDate,
            acceptDate: params.acceptDate,
            result: params.result,
            num_person: params.num_person,
            total_time: params.total_time,
          },
          { transaction }
        );
        // update trung gian
        const roleUser = params.role;
        if (roleUser !== '') {
          const roleUserArray: string[] = roleUser.split(',');

          const role = await this.modelRole.findOne({
            where: {
              type: params.type
            }
          });

          // roleUserDelete.
          const object = await this.modelRoleUser.destroy({
            where: {
              role_able_id: topicUpdate.dataValues.id,
              type: TypeRoleUser.member
            },
            force: true
          })
          console.log(object);
          if (role) {
            for (let index = 0; index < roleUserArray.length; index++) {
              const roleUser = roleUserArray[index];
              let type = TypeRoleUser.member;
              let time: number = 0;
              let user_id: number;
              if (index === 0) {
                type = TypeRoleUser.main;
                time = 400;
                user_id = Number(roleUser);
                const mainRole = await this.modelRoleUser.findOne({
                  where: {
                    role_able_id: topic.dataValues.id,
                    type: TypeRoleUser.main
                  }
                });
                if (mainRole) {
                  mainRole.set({ user_id: user_id })
                  mainRole.save();
                }
              } else if (index === 1) {
                type = TypeRoleUser.support
                time = 120;
                user_id = Number(roleUser);
                const supportRole = await this.modelRoleUser.findOne({
                  where: {
                    role_able_id: topic.dataValues.id,
                    type: TypeRoleUser.support
                  }
                });
                if (supportRole) {
                  supportRole.set({ user_id: user_id })
                  supportRole.save();
                }
              } else {
                time = 280 / (roleUserArray.length - 2)
                user_id = Number(roleUser);
                await this.modelRoleUser.upsert({
                  role_able_id: topic.dataValues.id,
                  user_id: Number(roleUser),
                  type: type,
                  time: String(time),
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
}
