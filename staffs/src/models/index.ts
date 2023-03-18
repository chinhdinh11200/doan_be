import * as Sequelize from 'sequelize';
import { values } from 'lodash';
import department from './department';
import user from './user';
import token from './token';
import classes from './class';
import subject from './subject';
import time from './time';
import mark from './mark';
import exam from './exam';
export type DB = ReturnType<typeof initialize>;

export const initialize = (sqlize: Sequelize.Sequelize) => {
  const db = {
    Department: department(sqlize, Sequelize.DataTypes),
    User: user(sqlize, Sequelize.DataTypes),
    Token: token(sqlize, Sequelize.DataTypes),
    Classes: classes(sqlize, Sequelize.DataTypes),
    Subject:  subject(sqlize, Sequelize.DataTypes),
    Time:  time(sqlize, Sequelize.DataTypes),
    Mark:  mark(sqlize, Sequelize.DataTypes),
    Exam:  exam(sqlize, Sequelize.DataTypes),
  };

  for (const model of values(db)) {
    if (typeof model.ASSOCIATE === 'function') {
      model.ASSOCIATE();
    }
  }

  return {
    ...db,
    sequelize: sqlize,
    Sequelize,
  };
};
