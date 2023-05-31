import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class RoomRepository extends BaseRepository {
  private readonly model: DB['Room'];
  private readonly modelYear: DB['Year'];
  private readonly modelUser: DB['User'];
  private readonly modelSubject: DB['Subject'];
  constructor(db: DB) {
    super(db);
    this.model = db.Room;
    this.modelYear = db.Year;
    this.modelUser = db.User;
    this.modelSubject = db.Subject;
  }

  public search = async (params: types.room.RoomSearchParam) => {
    const findOption: FindAndCountOptions = {
      include: [
        {
          model: this.modelUser,
          as: 'user',
          attributes: ['id', 'name'],
        },
        {
          model: this.modelSubject,
          as: 'subject',
          attributes: ['id', 'name'],
        }
      ],
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

    const rooms = await this.model.findAndCountAll(findOption);
    return rooms;
  };

  public create = async (params: types.room.RoomCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      var factor: number = 0;
      if (params.time && params.time <= 60) {
        factor = 1.0
      } else {
        factor = 1.2
      }
      const room = await this.model.create(
        {
          subject_id: params.subject_id,
          user_id: params.user_id,
          name: params.name,
          type: params.type,
          factor: factor, // được suy ra từ type
          code: params.code,
          num_exam_session: params.num_exam_session,
          time: params.time,
          startDate: params.startDate,
          semester: params.semester,
          year_id: params.year_id,
        },
        { transaction }
      );
      await transaction.commit();

      return room.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public findOneById = async (id: string | number) => {
    const data = await this.model.findByPk(id);

    return data?.dataValues;
  };
  public update = async (
    params: types.room.RoomUpdateParam,
    roomId: number | string
  ) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      var factor: number = 0;
      if (params.time && params.time <= 60) {
        factor = 1.0
      } else {
        factor = 1.2
      }
      const roomUpdate = await this.findById(roomId);
      if (roomUpdate) {
        const room = await roomUpdate.update(
          {
            subject_id: params.subject_id,
            user_id: params.user_id,
            name: params.name,
            type: params.type,
            factor: factor, // được suy ra từ type
            code: params.code,
            num_exam_session: params.num_exam_session,
            time: params.time,
            startDate: params.startDate,
            semester: params.semester,
            year_id: params.year_id,
          },
          { transaction }
        );
        await transaction.commit();

        return room.dataValues;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  public delete = async (roomId: number | string) => {
    const transaction = await this.db.sequelize.transaction();

    try {
      const room = this.model.destroy({
        where: {
          id: roomId,
        },
      });

      return room;
    } catch (error) {
      throw error;
    }
  };

  public findById = async (roomId: string | number) => {
    return await this.model.findOne({
      where: {
        id: roomId,
      },
      include: [
        {
          model: this.modelYear,
          as: 'year',
          attributes: ['id', 'name'],
        }
      ]
    });
  };
}
