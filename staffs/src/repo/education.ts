import { FindAndCountOptions, Op, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TypeRoleUser } from '../common/factory/_common';

export default class Education extends BaseRepository {
  private readonly model: DB['Education'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Education;
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
    const education = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelUser,
          through: { attributes: ['time', 'type'], as: 'role_user', },
          attributes: ['id', 'name'],
        }
      ],
      order: [
        [literal('`users->role_user`.`type`'), 'ASC']
      ]
    });
    const data = {
      ...education?.dataValues
    }
    return data;
  };

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

      const role = await this.modelRole.findOne({
        where: {
          type: params.type
        }
      });
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      if (role) {
        await this.modelRoleAble.create({
          role_id: role.id,
          role_able_id: education.dataValues.id,
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
            role_able_id: education.dataValues.id,
            user_id: Number(roleUser),
            type: type,
            time: String(time),
          })
        })
      }

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
              role_able_id: educationUpdate.dataValues.id,
              type: TypeRoleUser.member
            },
            force: true
          })
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
                    role_able_id: education.dataValues.id,
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
                    role_able_id: education.dataValues.id,
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
                  role_able_id: education.dataValues.id,
                  user_id: Number(roleUser),
                  type: type,
                  time: String(time),
                })
              }
            }
          }
        }
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
      await this.modelRoleUser.destroy({
        where: {
          role_able_id: educationId,
        },
        // force: true
      })

      return education;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (educationId: string | number) => {
    return await this.model.findByPk(educationId);
  };
}
