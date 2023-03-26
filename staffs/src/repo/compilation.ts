import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class Compilation extends BaseRepository {
    private readonly model: DB['Compilation'];
    constructor(db: DB) {
        super(db);

        this.model = db.Compilation;
    }

    public search = async (params: types.compilation.CompilationSearchParam) => {
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

        const compilations = this.model.findAndCountAll(findOption);
        return compilations;
    };
    public create = async (params: types.compilation.CompilationCreateParam) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const compilation = await this.model.create(
                {
                    name: params.name,
                    code: params.code,
                    num_person: params.num_person,
                    total_time: params.total_time,
                    number_credit: params.number_credit,
                    date_decision: params.date_decision,
                },
                { transaction }
            );
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
            const compilationUpdate = await this.findById(compilationId);
            if (compilationUpdate) {
                const compilation = await compilationUpdate.update(
                    {
                        name: params.name,
                        code: params.code,
                        num_person: params.num_person,
                        total_time: params.total_time,
                        number_credit: params.number_credit,
                        date_decision: params.date_decision,
                    },
                    { transaction }
                );
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

            return compilation;
        } catch (error) {
            throw error;
        }
    };

    public findById = async (compilationId: string | number) => {
        return await this.model.findByPk(compilationId);
    };
}
