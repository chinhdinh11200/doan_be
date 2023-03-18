import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';

export default class ClassRepository extends BaseRepository {
    private readonly model: DB['Classes'];
    constructor(db: DB) {
        super(db);

        this.model = db.Classes;
    }

    public search = async (params: types.classes.ClassSearchParam) => {
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

        const classes = await this.model.findAndCountAll(findOption);
        return classes;
    };

    public create = async (params: types.classes.ClassCreateParam) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const subject = await this.model.create(
                {
                    subject_id: params.subject_id,
                    user_id: params.user_id,
                    parent_id: params.parent_id,
                    name: params.name,
                    code: params.code,
                    form_teach: params.form_teach,
                    num_student: params.num_student,
                    classroom: params.classroom,
                    startDate: params.startDate,
                    endDate: params.endDate,
                    level_teach: params.level_teach,
                    time_teach: params.time_teach,
                    semester: params.semester,
                },
                { transaction }
            );
            await transaction.commit();

            return subject.dataValues;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
    public update = async (
        params: types.classes.ClassUpdateParam,
        subjectId: number | string
    ) => {
        const transaction = await this.db.sequelize.transaction();
        try {
            const subjectUpdate = await this.findById(subjectId);
            if (subjectUpdate) {
                const subject = await subjectUpdate.update(
                    {
                        subject_id: params.subject_id,
                        user_id: params.user_id,
                        parent_id: params.parent_id,
                        name: params.name,
                        code: params.code,
                        form_teach: params.form_teach,
                        num_student: params.num_student,
                        classroom: params.classroom,
                        startDate: params.startDate,
                        endDate: params.endDate,
                        level_teach: params.level_teach,
                        time_teach: params.time_teach,
                        semester: params.semester,
                    },
                    { transaction }
                );
                await transaction.commit();

                return subject.dataValues;
            }
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    };
    public delete = async (subjectId: number | string) => {
        const transaction = await this.db.sequelize.transaction();

        try {
            const subject = this.model.destroy({
                where: {
                    id: subjectId,
                },
            });

            return subject;
        } catch (error) {
            throw error;
        }
    };

    public findById = async (subjectId: string | number) => {
        return await this.model.findByPk(subjectId);
    };
}
