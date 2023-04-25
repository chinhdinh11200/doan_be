import { Classes } from './../../models/class';
import { Subject } from './../../models/subject';
import { User } from './../../models/user';
import * as XLSX from 'xlsx';
import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';
import { now } from 'lodash';
import { ROLE_USER } from '../../common/factory/_common';

interface TimetableData {
  tt: string;
  num_credit: string;
  ll: string;
  class_name: string;
  type: string;
  unit_of_week: string;
  day_of_week: string;
  num_unit: string
  class_room: string;
  start_date: string;
  end_date: string;
  user: string;
}

interface Timetable {
  tt: string;
  num_credit: string;
  ll: string;
  class_name: string;
  type: string;
  unit_of_week: string;
  day_of_week: string;
  num_unit: string
  class_room: string;
  start_date: string;
  end_date: string;
  user: string;
}

export default class ImportController extends Controller {
  private readonly importRepo: repository.Import;
  private readonly classRepo: repository.Classes;
  private readonly subjectRepo: repository.Subject;
  private readonly userRepo: repository.User;
  constructor(db: DB) {
    super(db);
    this.importRepo = new repository.Import(db);
    this.classRepo = new repository.Classes(db);
    this.subjectRepo = new repository.Subject(db);
    this.userRepo = new repository.User(db);
  }

  public user = async (req: Request, res: Response, next: NextFunction) => {
    // users-20230413T075130167Z405903 TKB-20230413T080451179Z535466
    const wb = XLSX.readFile('./public/TKB-20230413T080451179Z535466.xlsx');
    const sheets = wb.SheetNames;
    const sheetName = wb.Sheets[sheets[6]];
    const range = sheetName + '!A3:H3';
    if (sheets.length > 0) {
      const data = XLSX.utils.sheet_to_json<TimetableData>(sheetName, {
        range: 3,
        header: ['tt', 'num_credit', 'll', 'class_name', 'type', 'unit_of_week', 'day_of_week', 'num_unit', 'class_room', 'start_date', 'end_date', 'user']
      });
      // await this.db.sequelize.transaction(async (t) => {
      var parentId: number;
      var userId: number;
      var subjectId: number = 0;
      for (let index = 0; index < data.length; index++) {
        const row = data[index];
        const className = row.class_name;
        if (className !== undefined) {
          const code = className?.substring(className?.lastIndexOf('(') + 1, className?.lastIndexOf(')'))
          const { count: countSubject, rows: dataSubject } = await this.subjectRepo.search({ name: row.class_name });
          if (countSubject <= 0) {
            if (row.type === 'LT') {
              const { dataValues: subject } = await this.subjectRepo.create({
                name: className,
                code: code,
              });
              subjectId = subject.id;
            }
          } else {
            subjectId = dataSubject[0].id;
          }
          if (row.user !== undefined) {
            const users = row.user.split(', ');
            for (var indexUser = 0; indexUser < users.length; indexUser++) {
              if (row.user !== 'Giảng viên mời' || users[indexUser] !== 'Giảng viên mời' || users[indexUser] !== 'mời') {
                const { count: countUser, rows: dataUser } = await this.userRepo.search({ name: users[indexUser] });
                if (countUser <= 0) {
                  const { dataValues: dataValueUser } = await this.userRepo.create({
                    name: users[indexUser],
                    code: "",
                    department_id: 1,
                    email: "",
                    degree: "",
                    income: 0,
                    number_salary: 0,
                    password: "password",
                    position: Object.keys(ROLE_USER)[3],
                  });
                  userId = dataValueUser.id;
                } else {
                  userId = dataUser[0].id;
                }
                const nameSearch = className.substring(0, className.indexOf('.') > 0 ? className.indexOf('.') : className.length)
                const { count: countClass, rows: parentClass } = await this.classRepo.search({ name: nameSearch, parent_id: false });
                if (code.indexOf('.') >= 0) {
                  const { count: countChildClass, rows: childClass } = await this.classRepo.search({ name: className, parent_id: true });
                  if (countChildClass <= 0) {
                    const { dataValues: dataValuesClass } = await this.classRepo.create({
                      name: row.class_name,
                      code: code,
                      num_credit: Number(row.num_credit),
                      classroom: row.class_room,
                      form_teach: row.type,
                      startDate: row.start_date,
                      endDate: row.end_date,
                      num_lesson: Number(row.unit_of_week),
                      num_student: Number(row.ll),
                      subject_id: subjectId,
                      user_id: userId,
                      semester: "1",
                      level_teach: "",
                      time_teach: "",
                      parent_id: parentClass[0] ? parentClass[0].id : undefined
                    })
                  }
                } else {
                  if (countClass <= 0) {
                    const { dataValues: dataValuesClass } = await this.classRepo.create({
                      name: row.class_name,
                      code: code,
                      num_credit: Number(row.num_credit),
                      classroom: row.class_room,
                      form_teach: row.type,
                      startDate: row.start_date,
                      endDate: row.end_date,
                      num_lesson: Number(row.unit_of_week),
                      num_student: Number(row.ll),
                      subject_id: subjectId,
                      user_id: userId,
                      semester: "1",
                      level_teach: "1",
                      time_teach: "120",
                    })

                  }
                }
              } else {
                const nameSearch = className.substring(0, className.indexOf('.') > 0 ? className.indexOf('.') : className.length)
                const { count: countClass, rows: parentClass } = await this.classRepo.search({ name: nameSearch, parent_id: false });
                if (code.indexOf('.') >= 0) {
                  if (parentClass[0] == undefined) {
                    console.log(parentClass[0], className, row.tt);
                  }
                  const { count: countChildClass, rows: childClass } = await this.classRepo.search({ name: className, parent_id: true });
                  if (countChildClass <= 0) {
                    const { dataValues: dataValuesClass } = await this.classRepo.create({
                      name: row.class_name,
                      code: code,
                      num_credit: Number(row.num_credit),
                      classroom: row.class_room,
                      form_teach: row.type,
                      startDate: row.start_date,
                      endDate: row.end_date,
                      num_lesson: Number(row.unit_of_week),
                      num_student: Number(row.ll),
                      subject_id: subjectId,
                      // user_id: userId,
                      semester: "1",
                      level_teach: "",
                      time_teach: "",
                      parent_id: parentClass[0] ? parentClass[0].id : undefined
                    })
                  }
                } else {
                  if (countClass <= 0) {
                    const { dataValues: dataValuesClass } = await this.classRepo.create({
                      name: row.class_name,
                      code: code,
                      num_credit: Number(row.num_credit),
                      classroom: row.class_room,
                      form_teach: row.type,
                      startDate: row.start_date,
                      endDate: row.end_date,
                      num_lesson: Number(row.unit_of_week),
                      num_student: Number(row.ll),
                      subject_id: subjectId,
                      // user_id: userId,
                      semester: "1",
                      level_teach: "1",
                      time_teach: "120",
                    })
                  }
                }
              }
            }
          } else {
            const nameSearch = className.substring(0, className.indexOf('.') > 0 ? className.indexOf('.') : className.length)
            const { count: countClass, rows: parentClass } = await this.classRepo.search({ name: nameSearch, parent_id: false });
            if (code.indexOf('.') >= 0) {
              if (parentClass[0] == undefined) {
                console.log(parentClass[0], className, row.tt);
              }
              const { count: countChildClass, rows: childClass } = await this.classRepo.search({ name: className, parent_id: true });
              if (countChildClass <= 0) {
                const { dataValues: dataValuesClass } = await this.classRepo.create({
                  name: row.class_name,
                  code: code,
                  num_credit: Number(row.num_credit),
                  classroom: row.class_room,
                  form_teach: row.type,
                  startDate: row.start_date,
                  endDate: row.end_date,
                  num_lesson: Number(row.unit_of_week),
                  num_student: Number(row.ll),
                  subject_id: subjectId,
                  // user_id: userId,
                  semester: "1",
                  level_teach: "",
                  time_teach: "",
                  parent_id: parentClass[0] ? parentClass[0].id : undefined
                })
              }
            } else {
              if (countClass <= 0) {
                const { dataValues: dataValuesClass } = await this.classRepo.create({
                  name: row.class_name,
                  code: code,
                  num_credit: Number(row.num_credit),
                  classroom: row.class_room,
                  form_teach: row.type,
                  startDate: row.start_date,
                  endDate: row.end_date,
                  num_lesson: Number(row.unit_of_week),
                  num_student: Number(row.ll),
                  subject_id: subjectId,
                  // user_id: userId,
                  semester: "1",
                  level_teach: "1",
                  time_teach: "120",
                })
              }
            }
          }
        }
      }
      // })
      return res.json({
        sheets: sheets[6],
        data,
      });
    }
  }
}



// var indexParent = 0;
// var classParentId: number;
// var subjectId: number;
// var userId: number;
// try {
//   for (let index = 0; index < data.length; index++) {
//     const row = data[index];
//     if (index < 6) {
//       const { count: countUser, rows: dataUser } = await this.userRepo.search({ name: row.user });
//       if (countUser <= 0) {
//         const { dataValues: dataValueUser } = await this.userRepo.create({
//           name: row.user,
//           code: "",
//           department_id: 1,
//           email: "",
//           degree: "",
//           income: 0,
//           number_salary: 0,
//           password: "password",
//           position: "",
//         });
//         userId = dataValueUser.id
//       } else {
//         userId = dataUser[0].dataValues.id;
//       }
//       if (row.class_name) {
//         const { count: countSubject, rows: dataSubject } = await this.subjectRepo.search({ name: row.class_name });
//         if (countSubject <= 0) {
//           const { dataValues } = await this.subjectRepo.create({
//             name: row.class_name,
//             code: 'IMP' + index,
//             form_exam: row.type
//           });
//           subjectId = dataValues.id;
//         } else {
//           subjectId = dataSubject[0].dataValues.id;
//         }
//         const { dataValues: dataValuesClass } = await this.classRepo.create({
//           name: row.class_name,
//           code: 'IMP' + index,
//           num_credit: Number(row.num_credit),
//           classroom: row.class_room,
//           form_teach: row.type,
//           startDate: row.start_date,
//           endDate: row.end_date,
//           num_lesson: Number(row.unit_of_week),
//           num_student: Number(row.ll),
//           subject_id: subjectId,
//           user_id: userId,
//           semester: "1",
//           level_teach: "1",
//           time_teach: "120",

//         })
//         classParentId = dataValuesClass.id;
//         indexParent = index;
//       } else {
//         const { count: countSubject, rows: dataSubject } = await this.subjectRepo.search({ name: row.class_name });
//         subjectId = dataSubject[0].dataValues.id;

//         const { count: countClass, rows: dataClass } = await this.classRepo.search({ name: row.class_name });
//         classParentId = dataClass[0].dataValues.id;

//         await this.classRepo.create({
//           name: data[indexParent].class_name,
//           code: 'IMP' + index,
//           num_credit: Number(row.num_credit),
//           classroom: row.class_room,
//           form_teach: data[indexParent].type,
//           startDate: row.start_date,
//           endDate: row.end_date,
//           num_lesson: Number(row.unit_of_week),
//           num_student: Number(data[indexParent].ll),
//           subject_id: subjectId,
//           parent_id: classParentId,
//           user_id: userId,
//           semester: "1",
//           level_teach: "1",
//           time_teach: "120",
//         })
//       }
//     }
//   }
// } catch (error) {
// }