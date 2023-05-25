import { FindAndCountOptions, Op, Sequelize, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TypeRoleUser } from '../common/factory/_common';

export default class Invention extends BaseRepository {
  private readonly model: DB['Invention'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelYear: DB['Year'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Invention;
    this.modelRole = db.Role;
    this.modelUser = db.User;
    this.modelRoleAble = db.RoleAble;
    this.modelYear = db.Year;
    this.modelRoleUser = db.RoleUser;
  }

  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };

  public detail = async (id: string | number) => {
    const invention = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'type'], as: 'role_user',
            where: {
              type_role: 3
            }
          },
          attributes: ['id', 'name'],
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
      ...invention?.dataValues
    }
    return data;
  };

  public search = async (params: types.invention.InventionSearchParam) => {
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


    const inventions = this.model.findAndCountAll(findOption);
    return inventions;
  };
  public create = async (params: types.invention.InventionCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number;
      switch (params.level) {
        case 0:
          totalTime = 400;
          break;
        case 1:
          totalTime = 250;
          break;
        case 2:
          totalTime = 200;
          break;
        case 3:
          totalTime = 100;
          break;
        case 4:
          totalTime = 250;
          break;
        default:
          totalTime = 0;
          break;
      }
      const invention = await this.model.create(
        {
          name: params.name,
          code: params.code,
          level: params.level,
          num_person: roleUserArray.length,
          total_time: totalTime,
          date_recognition: params.date_recognition,
          number_recognition: params.number_recognition,
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
          role_able_id: invention.dataValues.id,
          type: params.type,
          time: String(totalTime),
        })
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member;
          let time: number = totalTime / roleUserArray.length
          await this.modelRoleUser.create({
            role_able_id: invention.dataValues.id,
            user_id: Number(roleUser),
            type: type,
            type_role: params.type,
            time: time,
          })
        })
      }
      await transaction.commit();

      return invention.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.invention.InventionUpdateParam,
    inventionId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      const inventionUpdate = await this.findById(inventionId);
      var totalTime: number;
      switch (params.level) {
        case 0:
          totalTime = 400;
          break;
        case 1:
          totalTime = 250;
          break;
        case 2:
          totalTime = 200;
          break;
        case 3:
          totalTime = 100;
          break;
        case 4:
          totalTime = 250;
          break;
        default:
          totalTime = 0;
          break;
      }
      if (inventionUpdate) {
        const invention = await inventionUpdate.update(
          {
            name: params.name,
            code: params.code,
            level: params.level,
            num_person: params.num_person,
            total_time: totalTime,
            date_recognition: params.date_recognition,
            number_recognition: params.number_recognition,
            year_id: params.year_id,
          },
          { transaction }
        );
        const roleAble = await this.modelRoleAble.findOne({
          where: {
            role_able_id: inventionUpdate.id,
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
              role_able_id: inventionUpdate.dataValues.id,
              type: TypeRoleUser.member,
              type_role: params.type,
            },
            force: true
          })
          if (role) {
            for (let index = 0; index < roleUserArray.length; index++) {
              const roleUser = roleUserArray[index];
              let type = TypeRoleUser.member;
              let time: number = totalTime / roleUserArray.length;
              await this.modelRoleUser.upsert({
                role_able_id: invention.dataValues.id,
                user_id: Number(roleUser),
                type: type,
                type_role: params.type,
                time: time,
              })
            }
          }
        }
        await transaction.commit();

        return invention.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (inventionId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const invention = this.model.destroy({
        where: {
          id: inventionId,
        },
      });
      await this.modelRoleUser.destroy({
        where: {
          role_able_id: inventionId,
        },
        // force: true
      })

      return invention;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (inventionId: string | number) => {
    return await this.model.findByPk(inventionId);
  };

  public export = async (userId: string | number) => {
    const inventions: any = await this.model.findAll({
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'user_id', 'type', 'type_role'],
            as: 'role_user',
            where: {
              type_role: 3,
              user_id: userId,
            }
          }
        }
      ],
      attributes: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('date_recognition'), '%d/%m/%Y'), 'date_recognition']],
      raw: true,
    })

    const inventionFormats = inventions.map((invention: any) => {
      let type = "Thành viên"
      switch (invention['users.role_user.type']) {
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
        ...invention,
        type: type,
      }
    })

    return inventionFormats;
  }
}
