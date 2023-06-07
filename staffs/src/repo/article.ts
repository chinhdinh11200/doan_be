import { FindAndCountOptions, Op, WhereOptions, literal } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import { TypeRoleUser } from '../common/factory/_common';
import { TYPE_ARTICLESCIENTIFIC } from '../common/constant';

export default class Article extends BaseRepository {
  private readonly model: DB['Article'];
  private readonly modelRole: DB['Role'];
  private readonly modelUser: DB['User'];
  private readonly modelYear: DB['Year'];
  private readonly modelRoleAble: DB['RoleAble'];
  private readonly modelRoleUser: DB['RoleUser'];
  constructor(db: DB) {
    super(db);

    this.model = db.Article;
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
    const article = await this.model.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'type'], as: 'role_user',
            where: {
              type_role: 2
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
      order: [
        [literal('`users->role_user`.`type`'), 'ASC']
      ]
    });
    const data = {
      ...article?.dataValues
    }
    return data;
  };

  public search = async (params: types.article.ArticleSearchParam) => {
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

    const articles = this.model.findAndCountAll(findOption);
    return articles;
  };
  public create = async (params: types.article.ArticleCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const roleUser = params.role;
      const roleUserArray: string[] = roleUser.split(',');
      var totalTime: number = 0;
      var timeMain: number = 0;
      var timeSupport: number = 0;
      var timeMember: number = 0;
      switch (params.type) {
        case 0:
          totalTime = 800;
          timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
          timeMember = 0.6 * totalTime / roleUserArray.length
          break;
          case 1:
            totalTime = 700;
            totalTime = params.open_access ? totalTime - 50 : totalTime;
            totalTime = params.open_access_scopus ? totalTime - 100 : totalTime;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 2:
            totalTime = 600;
            totalTime = params.open_access ? totalTime - 50 : totalTime;
            totalTime = params.open_access_scopus ? totalTime - 100 : totalTime;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 3:
            totalTime = 500;
            totalTime = params.open_access ? totalTime - 50 : totalTime;
            totalTime = params.open_access_scopus ? totalTime - 100 : totalTime;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 4:
            totalTime = 400; 
            totalTime = params.open_access ? totalTime - 50 : totalTime;
            totalTime = params.open_access_scopus ? totalTime - 100 : totalTime;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 5:
            totalTime = 300;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 6:
            totalTime = 250;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 7:
            totalTime = 200;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 8:
            totalTime = 100;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
        // case 1:
        //   totalTime = 300;
        //   timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
        //   timeMember = 0.6 * totalTime / roleUserArray.length
        //   break;
        default:
      }
      const article = await this.model.create(
        {
          name: params.name,
          code: params.code,
          type: params.type_article,
          open_access: params.open_access,
          open_access_scopus: params.open_access_scopus,
          index_article: params.index_article,
          year_id: params.year_id,
          total_time: totalTime,
          num_person: roleUserArray.length,
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
          role_able_id: article.dataValues.id,
          type: params.type,
          time: String(totalTime),
        })
        roleUserArray.forEach(async (roleUser, index) => {
          let type = TypeRoleUser.member;
          if (index === 0) {
            type = TypeRoleUser.main;
            await this.modelRoleUser.create({
              role_able_id: article.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeMain,
            })
          } else {
            type = TypeRoleUser.member
            await this.modelRoleUser.create({
              role_able_id: article.dataValues.id,
              user_id: Number(roleUser),
              type: type,
              type_role: params.type,
              time: timeMember,
            })
          }
        })
      }
      await transaction.commit();

      return article.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public update = async (
    params: types.article.ArticleUpdateParam,
    articleId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const articleUpdate = await this.findById(articleId);
      if (articleUpdate) {
        const roleUser = params.role;
        const roleUserArray: string[] = roleUser.split(',');
        var totalTime: number = 0;
        var timeMain: number = 0;
        var timeSupport: number = 0;
        var timeMember: number = 0;
        switch (params.type_article) {
          case 0:
            totalTime = 800;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 1:
            totalTime = 700;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 2:
            totalTime = 600;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 3:
            totalTime = 500;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 4:
            totalTime = 400;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 5:
            totalTime = 300;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 6:
            totalTime = 250;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 7:
            totalTime = 200;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          case 8:
            totalTime = 100;
            timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
            timeMember = 0.6 * totalTime / roleUserArray.length
            break;
          // case 1:
          //   totalTime = 300;
          //   timeMain = roleUserArray.length === 1 ? totalTime : 0.4 * totalTime + 0.6 * totalTime / roleUserArray.length
          //   timeMember = 0.6 * totalTime / roleUserArray.length
          //   break;
          default:
        }
        const article = await articleUpdate.update(
          {
            name: params.name,
            code: params.code,
            type: params.type_article,
            index_article: params.index_article,
            total_time: totalTime,
            num_person: roleUserArray.length,
            open_access: params.open_access,
            year_id: params.year_id,
            open_access_scopus: params.open_access_scopus,
          },
          { transaction }
        );

        const roleAble = await this.modelRoleAble.findOne({
          where: {
            role_able_id: articleUpdate.id,
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
              role_able_id: articleUpdate.dataValues.id,
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
                    role_able_id: article.dataValues.id,
                    type: TypeRoleUser.main,
                    type_role: params.type,
                  }
                });
                if (mainRole) {
                  mainRole.set({
                    user_id: user_id,
                    time: timeMain,
                    type_role: params.type,
                  })
                  mainRole.save();
                }
              } else {
                user_id = Number(roleUser);
                await this.modelRoleUser.upsert({
                  role_able_id: article.dataValues.id,
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

        return article.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (articleId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const article = this.model.destroy({
        where: {
          id: articleId,
        },
      });
      await this.modelRoleUser.destroy({
        where: {
          role_able_id: articleId,
        },
        // force: true
      })

      return article;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (articleId: string | number) => {
    return await this.model.findByPk(articleId);
  };
  
  public export = async (userId: string | number, yearId?: number | string) => {
    const articles: any = await this.model.findAll({
      include: [
        {
          model: this.modelUser,
          through: {
            attributes: ['time', 'user_id', 'type', 'type_role'],
            as: 'role_user',
            where: {
              type_role: 2,
              user_id: userId,
            }
          }
        }
      ],
      where: {
        year_id: yearId,
      },
      raw: true,
    })

    const articleFormats = articles.map((article: any) => {
      let type = TYPE_ARTICLESCIENTIFIC.find(type => type.value == article.type)?.label;
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
        type: type,
        role: role,
      }
    })
    
    return articleFormats;
  }
}
