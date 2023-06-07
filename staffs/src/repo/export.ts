import { literal } from 'sequelize';
import * as pug from 'pug';
import * as path from 'path';
import * as fs from 'fs';
import { DB } from './../models';
import BaseRepository from './_base';
import * as XLSX from 'xlsx';
import * as repository from './index';
import { POSITION_STAFF, codeFee, codeHVMM } from '../common/constant';
import moment from 'moment';
import { Response } from 'express';
const puppeteer = require('puppeteer');

export default class ExportRepository extends BaseRepository {
  private readonly model: DB['Exam'];
  private readonly modelUser: DB['User'];
  private readonly modelClasses: DB['Classes'];
  private readonly topicRepo: repository.Topic
  private readonly userRepo: repository.User
  private readonly articleRepo: repository.Article
  private readonly bookRepo: repository.Book
  private readonly compilationRepo: repository.Compilation
  private readonly educationRepo: repository.Education
  private readonly inventionRepo: repository.Invention
  private readonly scientificRepo: repository.Scientific
  private readonly thesisRepo: repository.Thesis
  private readonly subjectRepo: repository.Subject
  private readonly modelTopic: DB['Topic'];
  private readonly modelScientific: DB['Scientific'];
  private readonly modelCompilation: DB['Compilation'];
  private readonly modelBook: DB['Book'];
  private readonly modelEducation: DB['Education'];
  private readonly modelArticle: DB['Article'];
  private readonly modelInvention: DB['Invention'];
  private readonly modelThesis: DB['Thesis'];
  private readonly modelThesisUser: DB['ThesisUser'];
  private readonly modelYear: DB['Year'];
  constructor(db: DB) {
    super(db);

    this.model = db.Exam;
    this.modelYear = db.Year;
    this.modelUser = db.User;
    this.userRepo = new repository.User(db);
    this.topicRepo = new repository.Topic(db);
    this.articleRepo = new repository.Article(db);
    this.bookRepo = new repository.Book(db);
    this.compilationRepo = new repository.Compilation(db);
    this.educationRepo = new repository.Education(db);
    this.inventionRepo = new repository.Invention(db);
    this.scientificRepo = new repository.Scientific(db);
    this.thesisRepo = new repository.Thesis(db);
    this.subjectRepo = new repository.Subject(db);
    this.modelClasses = db.Classes;
    this.modelUser = db.User;
    this.modelTopic = db.Topic;
    this.modelScientific = db.Scientific;
    this.modelCompilation = db.Compilation;
    this.modelArticle = db.Article;
    this.modelInvention = db.Invention;
    this.modelEducation = db.Education
    this.modelBook = db.Book
    this.modelThesis = db.Thesis
    this.modelThesisUser = db.ThesisUser
  }

  public user = async () => {
    const users = await this.modelUser.findAll({
      attributes: [
        'id',
        'name',
        'code',
        'email',
        'position',
      ],
      raw: true
    });

    const classes = await this.modelClasses.findAll({
      include: {
        model: this.modelUser,
        attributes: [
          'name'
        ]
      },
      attributes: [
        'name',
        'code',
        'num_credit',
        'num_lesson',
        'level_teach',
        'form_teach',
        [literal('num_lesson * 1.2'), 'num_lesson_standard']
      ]
    });

    const classesCCC = classes.filter(classs => {
      // classs['time']: number = 30;
      return classs;
    })

    const headings: string[][] = [
      ['Id', 'Movie', 'Category', 'Director', 'Rating']
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(headings);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.utils.sheet_add_json(ws, users, { origin: -1 })
    XLSX.utils.sheet_add_aoa(ws, headings)
    XLSX.utils.sheet_add_json(ws, users, { origin: -1 })

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    const filepath = `/users.xlsx`;

    XLSX.writeFile(wb, filepath);

    return filepath;
  };

  public search = async () => {

  };

  public userTemplate = async (res: Response, userId: string | number, yearId: number | string) => {
    console.log(yearId, userId);
    let user: any = await this.userRepo.detail(userId);
    user = {
      ...user,
      departmentName: user.department.dataValues.departmentName,
      position: POSITION_STAFF.find(position => position.value == user?.position)?.label,
      birthday: user.birthday ? moment(user.birthday).format("DD/MM/YYYY") : '',
    }
    console.log(yearId, "a"); 
    const year = await this.modelYear.findByPk(yearId);
    const dateExport = `ngày ${moment(new Date()).format("DD")} tháng ${moment(new Date()).format("MM")} năm ${moment(new Date()).format("YYYY")}`
    const dataTeachSemesterOne = await this.modelClasses.findAll({
      attributes: ['name', 'code', 'num_student', 'semester', 'num_credit', 'num_lesson', 'exam_supervision', 'exam_create', 'marking', 'form_exam'],
      where: {
        user_id: userId,
        semester: 1,
        year_id: yearId,
      },
      // group: ['semester'],
      raw: true,
    })
    console.log(yearId, "b");

    const dataTeachSemesterOneHVMM = dataTeachSemesterOne.filter(classs => {
      return codeHVMM.some(t => classs.code.includes(t))
    }).map(classs => {
      let time = classs.num_lesson
      let middleSemester = ''
      let timeMiddle = 0;
      if (classs.num_student > 40 && classs.num_student <= 50) {
        time = time * 1.1
      } else if (classs.num_student > 50 && classs.num_student <= 65) {
        time *= 1.2
      } else if (classs.num_student > 65 && classs.num_student <= 80) {
        time *= 1.3
      } else if (classs.num_student > 80 && classs.num_student <= 100) {
        time *= 1.4
      } else if (classs.num_student > 100) {
        time *= 1.5
      }

      if (classs.exam_create) {
        middleSemester += 'Ra đề, '
        timeMiddle += 1;
      }

      if (classs.exam_supervision) {
        middleSemester += 'coi thi, '
        timeMiddle += 1;
      }

      if (classs.marking) {
        middleSemester += 'chấm thi, '
        switch (classs.form_exam) {
          case 0:
            timeMiddle += classs.num_student * 0.05;
            break;
          case 1:
            timeMiddle += classs.num_student * 0.05;
            break;
          case 2:
            timeMiddle += classs.num_student * 0.125;
            break;
        }
      }

      // if (classs.form_exam !== null) {
      switch (classs.form_exam) {
        case 0:
          middleSemester += 'TL'
          break;
        case 1:
          middleSemester += 'TN'
          break;
        case 2:
          middleSemester += 'VĐ'
          break;
        // }
      }

      return {
        ...classs,
        time : Math.ceil(time),
        middleSemester,
        timeMiddle : Math.ceil(timeMiddle),
      }
    })

    const dataTeachSemesterOneFee = dataTeachSemesterOne.filter(classs => {
      return codeFee.some(t => classs.code.includes(t))
    }).map(classs => {
      let time = classs.num_lesson
      let middleSemester = ''
      let timeMiddle = 0;
      if (classs.num_student > 40 && classs.num_student <= 50) {
        time = time * 1.1
      } else if (classs.num_student > 50 && classs.num_student <= 65) {
        time *= 1.2
      } else if (classs.num_student > 65 && classs.num_student <= 80) {
        time *= 1.3
      } else if (classs.num_student > 80 && classs.num_student <= 100) {
        time *= 1.4
      } else if (classs.num_student > 100) {
        time *= 1.5
      }

      if (classs.exam_create) {
        middleSemester += 'Ra đề, '
        timeMiddle += 1;
      }

      if (classs.exam_supervision) {
        middleSemester += 'coi thi, '
        timeMiddle += 1;
      }

      if (classs.marking) {
        middleSemester += 'chấm thi, '
        switch (classs.form_exam) {
          case 0:
            timeMiddle += classs.num_student * 0.05;
            break;
          case 1:
            timeMiddle += classs.num_student * 0.05;
            break;
          case 2:
            timeMiddle += classs.num_student * 0.125;
            break;
        }
      }

      // if (classs.form_exam !== null) {
      switch (classs.form_exam) {
        case 0:
          middleSemester += 'TL'
          break;
        case 1:
          middleSemester += 'TN'
          break;
        case 2:
          middleSemester += 'VĐ'
          break;
        // }
      }

      return {
        ...classs,
        time : Math.ceil(time),
        middleSemester,
        timeMiddle : Math.ceil(timeMiddle),
      }
    })

    const dataTeachSemesterTwo = await this.modelClasses.findAll({
      attributes: ['name', 'code', 'num_student', 'semester', 'num_credit', 'num_lesson', 'exam_supervision', 'exam_create', 'marking', 'form_exam'],
      where: {
        user_id: userId,
        semester: 2,
        year_id: yearId,
      },
      raw: true,
    })
    console.log(yearId, "c");

    const dataTeachSemesterTwoHVMM = dataTeachSemesterTwo.filter(classs => {
      return codeHVMM.some(t => classs.code.includes(t))
    }).map(classs => {
      let time = classs.num_lesson
      let middleSemester = '';
      let timeMiddle = 0;
      if (classs.num_student > 40 && classs.num_student <= 50) {
        time = time * 1.1
      } else if (classs.num_student > 50 && classs.num_student <= 65) {
        time *= 1.2
      } else if (classs.num_student > 65 && classs.num_student <= 80) {
        time *= 1.3
      } else if (classs.num_student > 80 && classs.num_student <= 100) {
        time *= 1.4
      } else if (classs.num_student > 100) {
        time *= 1.5
      }

      if (classs.exam_create) {
        middleSemester += 'Ra đề, '
        timeMiddle += 1;
      }

      if (classs.exam_supervision) {
        middleSemester += 'coi thi, '
        timeMiddle += 1;
      }

      if (classs.marking) {
        middleSemester += 'chấm thi, '
        switch (classs.form_exam) {
          case 0:
            timeMiddle += classs.num_student * 0.05;
            break;
          case 1:
            timeMiddle += classs.num_student * 0.05;
            break;
          case 2:
            timeMiddle += classs.num_student * 0.125;
            break;
        }
      }

      // if (classs.form_exam !== null) {
      switch (classs.form_exam) {
        case 0:
          middleSemester += 'TL'
          break;
        case 1:
          middleSemester += 'TN'
          break;
        case 2:
          middleSemester += 'VĐ'
          break;
        // }
      }

      return {
        ...classs,
        time : Math.ceil(time),
        middleSemester,
        timeMiddle : Math.ceil(timeMiddle),
      }
    })

    const dataTeachSemesterTwoFee = dataTeachSemesterTwo.filter(classs => {
      console.log(classs.code.includes("C"));
      return codeFee.some(t => classs.code.includes(t))
    }).map(classs => {
      let time = classs.num_lesson
      let middleSemester = ''
      let timeMiddle = 0;
      if (classs.num_student > 40 && classs.num_student <= 50) {
        time = time * 1.1
      } else if (classs.num_student > 50 && classs.num_student <= 65) {
        time *= 1.2
      } else if (classs.num_student > 65 && classs.num_student <= 80) {
        time *= 1.3
      } else if (classs.num_student > 80 && classs.num_student <= 100) {
        time *= 1.4
      } else if (classs.num_student > 100) {
        time *= 1.5
      }

      if (classs.exam_create) {
        middleSemester += 'Ra đề, '
        timeMiddle += 1;
      }

      if (classs.exam_supervision) {
        middleSemester += 'coi thi, '
        timeMiddle += 1;
      }

      if (classs.marking) {
        middleSemester += 'chấm thi, '
        switch (classs.form_exam) {
          case 0:
            timeMiddle += classs.num_student * 0.05;
            break;
          case 1:
            timeMiddle += classs.num_student * 0.05;
            break;
          case 2:
            timeMiddle += classs.num_student * 0.125;
            break;
        }
      }

      // if (classs.form_exam !== null) {
      switch (classs.form_exam) {
        case 0:
          middleSemester += 'TL'
          break;
        case 1:
          middleSemester += 'TN'
          break;
        case 2:
          middleSemester += 'VĐ'
          break;
        // }
      }

      return {
        ...classs,
        time : Math.ceil(time),
        middleSemester,
        timeMiddle : Math.ceil(timeMiddle),
      }
    })

    const subjects = await this.subjectRepo.export(userId, yearId);
    const thesis = await this.thesisRepo.export(userId, yearId);
    const topics = await this.topicRepo.export(userId, yearId);
    const articles = await this.articleRepo.export(userId, yearId);
    const books = await this.bookRepo.export(userId, yearId);
    const inventions = await this.inventionRepo.export(userId, yearId);
    const compilations = await this.compilationRepo.export(userId, yearId);
    const educations = await this.educationRepo.export(userId, yearId);
    const scientifics = await this.scientificRepo.export(userId, yearId);
    // res.json(user);
    // return
    const data = {
      user,
      year,
      dateExport,
      dataTeachSemesterOneHVMM,
      dataTeachSemesterOneFee,
      dataTeachSemesterTwoHVMM,
      dataTeachSemesterTwoFee,
      subjects,
      topics,
      articles,
      books,
      thesis,
      inventions,
      compilations,
      educations,
      scientifics,
    };
    // res.render('exportTemplate', data);
    // return;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    const html = pug.renderFile(path.basename('/views') + "/exportTemplate.pug", data);
    await page.setContent(html);
    await page.pdf({ path: path.resolve('public') + '/download/output.pdf', format: 'A4', margin: {
      top: '75px',
      right: '75px',
      bottom: '75px',
      left: '75px',
    }, });
    await browser.close();
    return path.resolve('public') + '/download/output.pdf'
    // return path.basename('/views');
    // const html = pug.renderFile(path.basename('/views') + "/exportTemplate.pug", data);
    const workbook = XLSX.read(html, { type: 'string' });

    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range('A2:N2');
    const centerCells = [];
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        centerCells.push(cellAddress);
      }
    }
    workbook.Sheets[sheetName]['!cols']
    // console.log(sheet['!ref']);
    
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    const filepath = `/users.xlsx`;

    XLSX.writeFile(workbook, filepath);

    return filepath;
  };
}
