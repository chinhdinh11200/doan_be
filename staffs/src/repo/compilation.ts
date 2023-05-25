import { FindAndCountOptions, Op, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TypeRoleUser } from '../common/factory/_common';

export default class Compilation extends BaseRepository {
  private readonly model: DB['Compilation'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelYear: DB['Year'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Compilation;
    this.modelRole = db.Role;
    this.modelYear = db.Year;
    this.modelUser = db.User;
    this.modelRoleAble = db.RoleAble;
    this.modelRoleUser = db.RoleUser;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };

  public detail = async (id: string | number) => {
    const compilation = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelUser,
          through: { attributes: ['time', 'type'], as: 'role_user',
          where: {
            type_role: 7
          } },
          attributes: ['id', 'name'],
        },
        {
          model : this.modelYear,
          as: 'year',
          attributes: ['id', 'name'],
        }
      ],
      order: [
        [literal('`users->role_user`.`type`'), 'ASC']
      ]
    });
    const data = {
      ...compilation?.dataValues
    }
    return data;
  };

  public search = async (params: types.compilation.CompilationSearchParam) => {
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


    const compilations = this.model.findAndCountAll(findOption);
    return compilations;
  };

  public create = async (params: types.compilation.CompilationCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number;
      var timeMain: number;
      var timeMember: number;
      switch (params.form_construction) {
        case 0:
          totalTime = 42 * params.number_credit;
          timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length;
          timeMember = 0.6 * totalTime / roleUserArray.length;
          break;
        case 1:
          totalTime = 14 * params.number_credit;
          timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length;
          timeMember = 0.6 * totalTime / roleUserArray.length;
          break;
        default:
          totalTime = 0;
          timeMain = 0;
          timeMember = 0;
          break;
      }
      const compilation = await this.model.create(
        {
          name: params.name,
          code: params.code,
          form_construction: params.form_construction,
          num_person: roleUserArray.length,
          total_time: totalTime,
          number_credit: params.number_credit,
          date_decision: params.date_decision,
          num_decision: params.num_decision,
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
          role_able_id: compilation.dataValues.id,
          type: params.type,
          time: String(totalTime),
        })
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member;
          if (index === 0) {
            type = TypeRoleUser.main;
            await this.modelRoleUser.create({
              role_able_id: compilation.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeMain,
            })
          } else {
            await this.modelRoleUser.create({
              role_able_id: compilation.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeMember,
            })
          }
        })
      }

      await transaction.commit();

      return compilation.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.compilation.CompilationUpdateParam,
    compilationId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number;
      var timeMember: number;
      var timeMain: number;
      switch (params.form_construction) {
        case 0:
          totalTime = 42 * params.number_credit;
          timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length;
          timeMember = 0.6 * totalTime / roleUserArray.length;
          break;
        case 1:
          totalTime = 14 * params.number_credit;
          timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length;
          timeMember = 0.6 * totalTime / roleUserArray.length;
          break;
        default:
          totalTime = 0;
          timeMain = 0;
          timeMember = 0;
          break;
      }
      const compilationUpdate = await this.findById(compilationId);
      if (compilationUpdate) {
        const compilation = await compilationUpdate.update(
          {
            name: params.name,
            code: params.code,
            form_construction: params.form_construction,
            num_person: params.num_person,
            total_time: totalTime,
            number_credit: params.number_credit,
            date_decision: params.date_decision,
            num_decision: params.num_decision,
            year_id: params.year_id,
          },
          { transaction }
        );

        const roleAble = await this.modelRoleAble.findOne({
          where: {
            role_able_id: compilationUpdate.id,
            type: params.type,
          }
        });
        roleAble?.set({
          time: String(totalTime)
        })
        roleAble?.save();
        if (roleUser !== '') {
          const role = await this.modelRole.findOne({
            where: {
              type: params.type
            }
          });

          // roleUserDelete.
          const object = await this.modelRoleUser.destroy({
            where: {
              role_able_id: compilationUpdate.dataValues.id,
              type: TypeRoleUser.member,
              type_role: params.type,
            },
            force: true
          })
          if (role) {
            for (let index = 0; index < roleUserArray.length; index++) {
              const roleUser = roleUserArray[index];
              let type = TypeRoleUser.member;
              if (index === 0) {
                type = TypeRoleUser.main;
                const mainRole = await this.modelRoleUser.findOne({
                  where: {
                    role_able_id: compilation.dataValues.id,
                    type: TypeRoleUser.main,
                    type_role: params.type,
                  }
                })
                mainRole?.set({
                  user_id: Number(roleUser), time: timeMain,
                  type_role: params.type,
                })
                mainRole?.save();
              } else {
                await this.modelRoleUser.upsert({
                  role_able_id: compilation.dataValues.id,
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

        return compilation.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (compilationId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const compilation = this.model.destroy({
        where: {
          id: compilationId,
        },
      });
      await this.modelRoleUser.destroy({
        where: {
          role_able_id: compilationId,
        },
        // force: true
      })

      return compilation;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (compilationId: string | number) => {
    return await this.model.findByPk(compilationId);
  };
  
  public export = async (userId: string | number) => {
    const compilations: any = await this.model.findAll({
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'user_id', 'type', 'type_role'],
            as: 'role_user',
            where: {
              type_role: 7,
              user_id: userId,
            }
          }
        }
      ],
      raw: true,
    })

    const compilationFormats = compilations.map((compilation: any) => {
      let type = "Thành viên"
      switch (compilation['users.role_user.type']) {
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
        ...compilation,
        type: type,
      }
    })

    return compilationFormats;
  }
}
