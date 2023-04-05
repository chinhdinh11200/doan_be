import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Topic extends BaseRepository {
    private readonly model: DB['Topic'];
    constructor(db: DB) {
        super(db);

        this.model = db.Topic;
    }

    public search = async (params: types.topic.TopicSearchParam) => {
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

        const topics = this.model.findAndCountAll(findOption);
        return topics;
    };
    public create = async (params: types.topic.TopicCreateParam) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const topic = await this.model.create(
                {
                    name: params.name,
                    code: params.code,
                    level: params.level,
                    endDate: params.endDate,
                    result: params.result,
                    num_person: params.num_person,
                    total_time: params.total_time,
                },
                { transaction }
            );
            await transaction.commit();

            return topic.dataValues;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
    public update = async (
        params: types.topic.TopicUpdateParam,
        topicId: number | string
    ) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const topicUpdate = await this.findById(topicId);
            if (topicUpdate) {
                const topic = await topicUpdate.update(
                    {
                        name: params.name,
                        code: params.code,
                        level: params.level,
                        endDate: params.endDate,
                        result: params.result,
                        num_person: params.num_person,
                        total_time: params.total_time,
                    },
                    { transaction }
                );
                await transaction.commit();

                return topic.dataValues;
            }
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
    public delete = async (topicId: number | string) => {
        const transaction = await this.db.sequelize.transaction();

        try {
            const topic = this.model.destroy({
                where: {
                    id: topicId,
                },
            });

            return topic;
        } catch (error) {
            throw error;
        }
    };

    public findById = async (topicId: string | number) => {
        return await this.model.findByPk(topicId);
    };
}
