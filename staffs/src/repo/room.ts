import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class RoomRepository extends BaseRepository {
  private readonly model: DB['Room'];
  constructor(db: DB) {
    super(db);
    this.model = db.Room;
  }

  public search = async (params: types.room.RoomSearchParam) => {
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

    const rooms = await this.model.findAndCountAll(findOption);
    return rooms;
  };

  public create = async (params: types.room.RoomCreateParam) => {
    const transaction = await this.db.sequelize.transaction();
    try {
      const room = await this.model.create(
        {
          exam_id: params.exam_id,
          semester_id: params.semester_id,
          name: params.name,
          code: params.code,
          num_student: params.num_student,
          startDate: params.startDate,
          endDate: params.endDate,
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
      const roomUpdate = await this.findById(roomId);
      if (roomUpdate) {
        const room = await roomUpdate.update(
          {
            exam_id: params.exam_id,
            semester_id: params.semester_id,
            name: params.name,
            code: params.code,
            num_student: params.num_student,
            startDate: params.startDate,
            endDate: params.endDate,
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
    return await this.model.findByPk(roomId);
  };
}
