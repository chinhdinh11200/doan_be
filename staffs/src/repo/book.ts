import { FindAndCountOptions, Op, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TypeRoleUser } from '../common/factory/_common';

export default class Book extends BaseRepository {
  private readonly model: DB['Book'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Book;
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
    const book = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'type'], as: 'role_user',
            where: {
              type_role: 4
            }
          },
          attributes: ['id', 'name'],
          // as: 'role_user',
        }
      ],
      order: [
        [literal('`users->role_user`.`type`'), 'ASC']
      ]
    });
    const data = {
      ...book?.dataValues
    }
    return data;
  };

  public search = async (params: types.book.BookSearchParam) => {
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


    const books = this.model.findAndCountAll(findOption);
    return books;
  };
  public create = async (params: types.book.BookCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number;
      var timeMain: number;
      var timeMember: number;
      switch (params.type_book) {
        case 0:
          totalTime = 600;
          break;
        case 1:
          totalTime = 400;
          break;
        case 2:
          totalTime = 300;
          break;
        case 3:
          totalTime = 400;
          break;
        default:
          totalTime = 0;
          break;
      }

      timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length;
      timeMember = 0.6 * totalTime / roleUserArray.length;
      const book = await this.model.create(
        {
          name: params.name,
          code: params.code,
          num_publish: params.num_publish,
          num_person: roleUserArray.length,
          total_time: totalTime,
          type: params.type_book,
          num_page: params.num_page,
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
          role_able_id: book.dataValues.id,
          type: params.type,
          time: String(totalTime),
        })
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member;
          if (index === 0) {
            type = TypeRoleUser.main;
            await this.modelRoleUser.create({
              role_able_id: book.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeMain,
            })
          } else {
            await this.modelRoleUser.create({
              role_able_id: book.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeMember,
            })
          }
        })
      }

      await transaction.commit();

      return book.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  public update = async (
    params: types.book.BookUpdateParam,
    bookId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number;
      var timeMain: number;
      var timeMember: number;
      switch (params.type_book) {
        case 0:
          totalTime = 600;
          break;
        case 1:
          totalTime = 400;
          break;
        case 2:
          totalTime = 300;
          break;
        case 3:
          totalTime = 400;
          break;
        default:
          totalTime = 0;
          break;
      }
      timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length;
      timeMember = 0.6 * totalTime / roleUserArray.length;
      const bookUpdate = await this.findById(bookId);
      if (bookUpdate) {
        const book = await bookUpdate.update(
          {
            name: params.name,
            code: params.code,
            num_publish: params.num_publish,
            num_person: roleUserArray.length,
            total_time: totalTime,
            num_page: params.num_page,
            type: params.type_book,
            year_id: params.year_id,
          },
          { transaction }
        );

        const roleAble = await this.modelRoleAble.findOne({
          where: {
            role_able_id: bookUpdate.id,
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
              role_able_id: bookUpdate.dataValues.id,
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
                    role_able_id: book.dataValues.id,
                    type: TypeRoleUser.main,
                    type_role: params.type,
                  }
                });
                if (mainRole) {
                  mainRole.set({ user_id: user_id, time: timeMain })
                  mainRole.save();
                }
              } else {
                user_id = Number(roleUser);
                await this.modelRoleUser.upsert({
                  role_able_id: book.dataValues.id,
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

        return book.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  public delete = async (bookId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const book = this.model.destroy({
        where: {
          id: bookId,
        },
      });
      await this.modelRoleUser.destroy({
        where: {
          role_able_id: bookId,
        },
        // force: true
      })

      return book;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (bookId: string | number) => {
    return await this.model.findByPk(bookId);
  };
  
  public export = async (userId: string | number) => {
    const articles: any = await this.model.findAll({
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'user_id', 'type', 'type_role'],
            as: 'role_user',
            where: {
              type_role: 4,
              user_id: userId,
            }
          }
        } 
      ],
      raw: true,
    })

    const articleFormats = articles.map((article: any) => {
      let role = 'Thành viên';
      switch (article['users.role_user.type']) {
        case 0:
          role = "Tác giả chính"
          break;
        default:
          role = "Thành viên"
          break;
      }
      return {
        ...article,
        role: role,
      }
    })
    
    return articleFormats;
  }
}
