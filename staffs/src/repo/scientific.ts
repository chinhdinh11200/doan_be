import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Scientific extends BaseRepository {
    private readonly model: DB['Scientific'];
    constructor(db: DB) {
        super(db);

        this.model = db.Scientific;
    }

    public search = async (params: types.scientific.ScientificSearchParam) => {
        // const a: = this.makeMultipleAmbiguousCondition(params, 'search', ['name', 'code']);
        const findOption: FindAndCountOptions = {
            include: [],
        };

        if (params !== undefined) {
            const andArray: WhereOptions[] = [];
            if (params.search !== undefined) {
                andArray.push(
                    this.makeMultipleAmbiguousCondition(params, 'name', ['code', 'name'])
                );
            }
            findOption.where = {
                [Op.and]: andArray,
            };
        }

        const scientifics = this.model.findAndCountAll(findOption);
        return scientifics;
    };
    public create = async (params: types.scientific.ScientificCreateParam) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const scientific = await this.model.create(
                {
                    name: params.name,
                    code: params.code,
                    num_decision: params.num_decision,
                    total_time: params.total_time,
                    result_level: params.result_level,
                    date_decision: params.date_decision,
                },
                { transaction }
            );
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
        try {
            const scientificUpdate = await this.findById(scientificId);
            if (scientificUpdate) {
                const scientific = await scientificUpdate.update(
                    {
                        name: params.name,
                        code: params.code,
                        num_decision: params.num_decision,
                        total_time: params.total_time,
                        result_level: params.result_level,
                        date_decision: params.date_decision,
                    },
                    { transaction }
                );
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

            return scientific;
        } catch (error) {
            throw error;
        }
    };

    public findById = async (scientificId: string | number) => {
        return await this.model.findByPk(scientificId);
    };
}
