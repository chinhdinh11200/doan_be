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
import room from './room';
import role from './role';
import roleAble from './roleable';
import roleUser from './role_user';
import topic from './topic';
import article from './article';
import book from './book';
import compilation from './compilation';
import education from './education';
import invention from './invention';
import scientific from './scientific';
import thesis from './thesis';
import thesisUser from './thesisUser';
import year from './year';
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
    Room:  room(sqlize, Sequelize.DataTypes),
    Role:  role(sqlize, Sequelize.DataTypes),
    Topic:  topic(sqlize, Sequelize.DataTypes),
    Article:  article(sqlize, Sequelize.DataTypes),
    Book:  book(sqlize, Sequelize.DataTypes),
    Compilation:  compilation(sqlize, Sequelize.DataTypes),
    Invention:  invention(sqlize, Sequelize.DataTypes),
    Education:  education(sqlize, Sequelize.DataTypes),
    Scientific:  scientific(sqlize, Sequelize.DataTypes),
    RoleAble: roleAble(sqlize, Sequelize.DataTypes),
    RoleUser:  roleUser(sqlize, Sequelize.DataTypes),
    Thesis:  thesis(sqlize, Sequelize.DataTypes),
    ThesisUser:  thesisUser(sqlize, Sequelize.DataTypes),
    Year:  year(sqlize, Sequelize.DataTypes),
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
