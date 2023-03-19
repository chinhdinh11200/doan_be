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
                    this.makeMultipleAmbiguousCondition(params, 'name', ['name', 'code'])
                );
            }
            findOption.where = {
                [Op.and]: andArray,
            };
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
                    name: params.name,
                    code: params.code,
                    num_student: params.num_student,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    semester: params.semester,
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
                        name: params.name,
                        code: params.code,
                        num_student: params.num_student,
                        startDate: params.startDate,
                        endDate: params.endDate,
                        semester: params.semester,
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
