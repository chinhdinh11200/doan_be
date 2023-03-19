import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class ExamRepository extends BaseRepository {
    private readonly model: DB['Exam'];
    constructor(db: DB) {
        super(db);

        this.model = db.Exam;
    }

    public search = async (params: types.exam.ExamSearchParam) => {
        const findOption: FindAndCountOptions = {
            include: [],
        };
        if (params !== undefined) {
            const andArray: WhereOptions[] = [];
            if (params.search !== undefined) {
                andArray.push(
                    this.makeMultipleAmbiguousCondition(params, 'name', ['code', 'name', 'form_exam', 'time_work'])
                );
            }
            findOption.where = {
                [Op.and]: andArray,
            };
        }

        const exams = await this.model.findAndCountAll(findOption);
        return exams;
    };

    public create = async (params: types.exam.ExamCreateParam) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const exam = await this.model.create(
                {
                    user_id: params.user_id,
                    name: params.name,
                    code: params.code,
                    form_exam: params.form_exam,
                    time_work: params.time_work,
                    type: params.type,
                    number_question: params.number_question,
                },
                { transaction }
            );
            await transaction.commit();

            return exam.dataValues;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
    public update = async (
        params: types.exam.ExamUpdateParam,
        examId: number | string
    ) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const examUpdate = await this.findById(examId);
            if (examUpdate) {
                const exam = await examUpdate.update(
                    {
                        user_id: params.user_id,
                        name: params.name,
                        code: params.code,
                        form_exam: params.form_exam,
                        time_work: params.time_work,
                        type: params.type,
                        number_question: params.number_question,
                    },
                    { transaction }
                );
                await transaction.commit();

                return exam.dataValues;
            }
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
    public delete = async (examId: number | string) => {
        const transaction = await this.db.sequelize.transaction();

        try {
            const exam = this.model.destroy({
                where: {
                    id: examId,
                },
            });

            return exam;
        } catch (error) {
            throw error;
        }
    };

    public findById = async (examId: string | number) => {
        return await this.model.findByPk(examId);
    };
}
