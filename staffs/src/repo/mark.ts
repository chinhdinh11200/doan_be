import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class MarkRepository extends BaseRepository {
    private readonly model: DB['Mark'];
    constructor(db: DB) {
        super(db);

        this.model = db.Mark;
    }

    public search = async (params: types.mark.MarkSearchParam) => {
        const findOption: FindAndCountOptions = {
            include: [],
        };

        if (params !== undefined) {
            const andArray: WhereOptions[] = [];
            if (params.search !== undefined) {
                andArray.push(
                    this.makeMultipleAmbiguousCondition(params, 'time_mark', ['time_mark', 'form_mark'])
                );
            }
            findOption.where = {
                [Op.and]: andArray,
            };
        }

        const marks = await this.model.findAndCountAll(findOption);
        return marks;
    };

    public create = async (params: types.mark.MarkCreateParam) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const mark = await this.model.create(
                {
                    time_mark: params.time_mark,
                    form_mark: params.form_mark,
                    exam_id: params.exam_id,
                },
                { transaction }
            );
            await transaction.commit();

            return mark.dataValues;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
    public update = async (
        params: types.mark.MarkUpdateParam,
        markId: number | string
    ) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const markUpdate = await this.findById(markId);
            if (markUpdate) {
                const mark = await markUpdate.update(
                    {
                        exam_id: params.exam_id,
                        form_mark: params.form_mark,
                        time_mark: params.time_mark,
                    },
                    { transaction }
                );
                await transaction.commit();

                return mark.dataValues;
            }
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
    public delete = async (markId: number | string) => {
        const transaction = await this.db.sequelize.transaction();

        try {
            const mark = this.model.destroy({
                where: {
                    id: markId,
                },
            });

            return mark;
        } catch (error) {
            throw error;
        }
    };

    public findById = async (markId: string | number) => {
        return await this.model.findByPk(markId);
    };
}
