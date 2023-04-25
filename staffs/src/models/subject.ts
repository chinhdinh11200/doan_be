import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { types } from "../common";
import { Classes } from "./class";
import { commonFields } from "./_common";


export class Subject extends Model<InferAttributes<Subject>, InferCreationAttributes<Subject>> implements types.subject.Attr {
  declare readonly id : CreationOptional<number>;
  declare name: string; 
  declare code: string; 
  declare form_exam: CreationOptional<string>; 

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  /**
   * ASSOCIATE
   */
  public static ASSOCIATE() {
    Subject.hasMany(Classes, {foreignKey: 'subject_id'});
  }
}

export default (sequelize: Sequelize, dt: typeof DataTypes) => {
  Subject.init({
    id: {
      type: dt.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: dt.STRING,
    },
    code: {
      type: dt.STRING,
    },
    form_exam: {
      type: dt.STRING,
    },

    ...commonFields(),
  },{
    sequelize,
    tableName: 'subjects',
    name: {singular: 'subjects', plural: 'subjects'},
    underscored: false,
    paranoid: true,
  })

  return Subject;
}