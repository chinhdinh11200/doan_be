import { FindAndCountOptions, Op, Sequelize, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TypeRoleUser } from '../common/factory/_common';

export default class Scientific extends BaseRepository {
  private readonly model: DB['Scientific'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelYear: DB['Year'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Scientific;
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
        },
        {
          model : this.modelYear,
          as: 'year',
          attributes: ['id', 'name'],
        }
      ],
      attributes: ['name', 'code', 'num_decision', 'total_time', 'result_level', 'date_decision', 'result_academy', 'type', 'num_person', [Sequelize.fn('DATE_FORMAT', Sequelize.col('date_decision'), '%Y-%m-%d'), 'date_decision']],
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
    const typeGroup = 1;
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number = 0;
      var timeMember: number = 0;
      var level = params.result_level
      if (params.typeScientific == typeGroup) {
        switch (level) {
          case 0:
            totalTime = 100;
            break;
          case 1:
            totalTime = 90;
            break;
          default:
            totalTime = 0;
            break;
        }
      } else {
        switch (level) {
          case 0:
            totalTime = 25;
            break;
          case 1:
            totalTime = 0;
            break;
          default:
            totalTime = 0;
            break;
        }
        if (params.result_academy !== undefined) {
          level = params.result_academy;
          switch (level) {
            case 0:
              totalTime = 35;
              break;
            case 1:
              totalTime = 40;
              break;
            case 2:
              totalTime = 45;
              break;
            case 3:
              totalTime = 50;
              break;
            default:
              totalTime = 0;
              break;
          }
        }
      }
      timeMember = totalTime / roleUserArray.length;

      const scientific = await this.model.create(
        {
          name: params.name,
          code: params.code,
          num_decision: params.num_decision,
          total_time: totalTime,
          type: params.typeScientific,
          num_person: roleUserArray.length,
          result_level: params.result_level,
          result_academy: params.result_academy,
          date_decision: params.date_decision,
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
          role_able_id: scientific.dataValues.id,
          type: params.type,
          time: String(params.total_time),
        })
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member;
          let time: number = TypeRoleUser.member;
          await this.modelRoleUser.create({
            role_able_id: scientific.dataValues.id,
            user_id: Number(roleUser),
            type: type,
            type_role: params.type,
            time: Number(timeMember),
          })
        })
      }
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
    const typeGroup = 1;
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number = 0;
      var timeMember: number = 0;
      var level = params.result_level
      if (params.typeScientific == typeGroup) {
        switch (level) {
          case 0:
            totalTime = 100;
            break;
          case 1:
            totalTime = 90;
            break;
          default:
            totalTime = 0;
            break;
        }
      } else {
        switch (level) {
          case 0:
            totalTime = 25;

            break;
          case 1:
            totalTime = 0;
            break;
          default:
            totalTime = 0;
            break;
        }
        if (params.result_academy !== undefined) {
          level = params.result_academy;
          switch (level) {
            case 0:
              totalTime = 35;
              break;
            case 1:
              totalTime = 40;
              break;
            case 2:
              totalTime = 45;
              break;
            case 3:
              totalTime = 50;
              break;
            default:
              totalTime = 0;
              break;
          }
        }
      }
      timeMember = totalTime / roleUserArray.length;
      const scientificUpdate = await this.findById(scientificId);
      if (scientificUpdate) {
        const scientific = await scientificUpdate.update(
          {
            name: params.name,
            code: params.code,
            num_decision: params.num_decision,
            total_time: totalTime,
            result_level: params.result_level,
            result_academy: params.result_academy,
            date_decision: params.date_decision,
            year_id: params.year_id,
          },
          { transaction }
        );
        if (roleUser !== '') {

          const role = await this.modelRole.findOne({
            where: {
              type: params.type
            }
          });

          // roleUserDelete.
          const object = await this.modelRoleUser.destroy({
            where: {
              role_able_id: scientificUpdate.dataValues.id,
              type: TypeRoleUser.member,
              type_role: 5
            },
            force: true
          })
          if (role) {
            for (let index = 0; index < roleUserArray.length; index++) {
              const roleUser = roleUserArray[index];
              let type = TypeRoleUser.member;
              let time: number = timeMember;
              await this.modelRoleUser.upsert({
                role_able_id: scientific.dataValues.id,
                user_id: Number(roleUser),
                type: type,
                type_role: params.type,
                time: Number(timeMember),
              })
            }
          }
        }
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
          required: true,
          through: {
            attributes: ['time', 'user_id', 'type', 'type_role'],
            as: 'role_user',
            where: {
              [Op.and]: [
                { user_id: userId },
                { type_role: 5 },
              ]
            },

          },
          
        }
      ],
      attributes: ["*", [Sequelize.fn('DATE_FORMAT', Sequelize.col('date_decision'), '%d/%m/%Y'), 'date_decision']],
      raw: true,
    })
    
    const scientificFormats = scientifics.map((scientific: any) => {
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
