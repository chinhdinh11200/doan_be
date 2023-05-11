import { FindAndCountOptions, Op, Sequelize, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TypeRoleUser } from '../common/factory/_common';

export default class Scientific extends BaseRepository {
  private readonly model: DB['Scientific'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Scientific;
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
    const scientific = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'type'], as: 'role_user',
            where: {
              type_role: 5
            }
          },
          attributes: ['id', 'name'],
        }
      ],
      attributes: ['name', 'code', 'num_decision', 'total_time', 'result_level', 'date_decision', 'result_academy', [Sequelize.fn('DATE_FORMAT', Sequelize.col('date_decision'), '%Y-%m-%d'), 'date_decision']],
      order: [
        [literal('`users->role_user`.`type`'), 'ASC']
      ]
    });
    const data = {
      ...scientific?.dataValues
    }
    return data;
  };

  public search = async (params: types.scientific.ScientificSearchParam) => {
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
    const scientifics = this.model.findAndCountAll(findOption);
    return scientifics;
  };
  public create = async (params: types.scientific.ScientificCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      // const roleUser = params.role;
      // const roleUserArray: string[] = roleUser.split(',');
      const scientific = await this.model.create(
        {
          name: params.name,
          code: params.code,
          num_decision: params.num_decision,
          total_time: params.total_time,
          result_level: params.result_level,
          result_academy: params.result_academy,
          date_decision: params.date_decision,
        },
        { transaction }
      );
      const role = await this.modelRole.findOne({
        where: {
          type: params.type
        }
      });
      // if (role) {
      //   await this.modelRoleAble.create({
      //     role_id: role.id,
      //     role_able_id: scientific.dataValues.id,
      //     type: params.type,
      //     time: String(params.total_time),
      //   })
      //   roleUserArray.forEach(async (roleUser, index) => {
      //     let type = TypeRoleUser.member;
      //     let time: number = TypeRoleUser.member;
      //     if (index === 0) {
      //       type = TypeRoleUser.main;
      //       time = 400;
      //     } else if (index === 1) {
      //       type = TypeRoleUser.support
      //       time = 120;
      //     } else {

      //       time = 280 / (roleUserArray.length - 2)
      //     }
      //     // console.log("ROLE", time, type, roleUserArray.length);
      //     await this.modelRoleUser.create({
      //       role_able_id: scientific.dataValues.id,
      //       user_id: Number(roleUser),
      //       type: type,
      //       time: String(time),
      //     })
      //   })
      // }
      await transaction.commit();

      return scientific.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.scientific.ScientificUpdateParam,
    scientificId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    console.log(params);
    try {
      // const roleUser = params.role;
      // const roleUserArray: string[] = roleUser.split(',');
      const scientificUpdate = await this.findById(scientificId);
      if (scientificUpdate) {
        const scientific = await scientificUpdate.update(
          {
            name: params.name,
            code: params.code,
            num_decision: params.num_decision,
            total_time: params.total_time,
            result_level: params.result_level,
            result_academy: params.result_academy,
            date_decision: params.date_decision,
          },
          { transaction }
        );
        // if (roleUser !== '') {

        //   const role = await this.modelRole.findOne({
        //     where: {
        //       type: params.type
        //     }
        //   });

        //   // roleUserDelete.
        //   const object = await this.modelRoleUser.destroy({
        //     where: {
        //       role_able_id: scientificUpdate.dataValues.id,
        //       type: TypeRoleUser.member
        //     },
        //     force: true
        //   })
        //   if (role) {
        //     for (let index = 0; index < roleUserArray.length; index++) {
        //       const roleUser = roleUserArray[index];
        //       let type = TypeRoleUser.member;
        //       let time: number = 0;
        //       let user_id: number;
        //       if (index === 0) {
        //         type = TypeRoleUser.main;
        //         time = 400;
        //         user_id = Number(roleUser);
        //         const mainRole = await this.modelRoleUser.findOne({
        //           where: {
        //             role_able_id: scientific.dataValues.id,
        //             type: TypeRoleUser.main
        //           }
        //         });
        //         if (mainRole) {
        //           mainRole.set({ user_id: user_id })
        //           mainRole.save();
        //         }
        //       } else if (index === 1) {
        //         type = TypeRoleUser.support
        //         time = 120;
        //         user_id = Number(roleUser);
        //         const supportRole = await this.modelRoleUser.findOne({
        //           where: {
        //             role_able_id: scientific.dataValues.id,
        //             type: TypeRoleUser.support
        //           }
        //         });
        //         if (supportRole) {
        //           supportRole.set({ user_id: user_id })
        //           supportRole.save();
        //         }
        //       } else {
        //         time = 280 / (roleUserArray.length - 2)
        //         user_id = Number(roleUser);
        //         await this.modelRoleUser.upsert({
        //           role_able_id: scientific.dataValues.id,
        //           user_id: Number(roleUser),
        //           type: type,
        //           time: time,
        //         })
        //       }
        //     }
        //   }
        // }
        await transaction.commit();

        return scientific.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (scientificId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const scientific = this.model.destroy({
        where: {
          id: scientificId,
        },
      });
      await this.modelRoleUser.destroy({
        where: {
          role_able_id: scientificId,
        },
        // force: true
      })

      return scientific;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (scientificId: string | number) => {
    return await this.model.findByPk(scientificId);
  };

  public export = async (userId: string | number) => {
    const scientifics: any = await this.model.findAll({
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'user_id', 'type', 'type_role'],
            as: 'role_user',
            where: {
              type_role: 5,
              user_id: userId,
            }
          }
        }
      ],
      attributes: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('date_decision'), '%d/%m/%Y'), 'date_decision']],
      raw: true,
    })

    const scientificFormats = scientifics.map((scientific: any) => {
      // console.log(scientific['users.role_user.type'] + "CC");
      let type = "Thành viên"
      switch (scientific['users.role_user.type']) {
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
      return {
        ...scientific,
        type: type,
      }
    })

    return scientificFormats;
  }
}
