import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { FORM_EXAM, codeFee, codeHVMM } from '../../common/constant';

export default class ExportController extends Controller {
  private readonly exportRepo: repository.Export
  private readonly topicRepo: repository.Topic
  private readonly subjectRepo: repository.Subject
  private readonly articleRepo: repository.Article
  private readonly bookRepo: repository.Book
  private readonly compilationRepo: repository.Compilation
  private readonly educationRepo: repository.Education
  private readonly inventionRepo: repository.Invention
  private readonly scientificRepo: repository.Scientific
  private readonly thesisRepo: repository.Thesis
  private readonly modelClasses: DB['Classes'];
  private readonly modelUser: DB['User'];
  private readonly modelTopic: DB['Topic'];
  private readonly modelScientific: DB['Scientific'];
  private readonly modelCompilation: DB['Compilation'];
  private readonly modelBook: DB['Book'];
  private readonly modelEducation: DB['Education'];
  private readonly modelArticle: DB['Article'];
  private readonly modelInvention: DB['Invention'];
  private readonly modelThesis: DB['Thesis'];
  private readonly modelThesisUser: DB['ThesisUser'];
  constructor(db: DB) {
    super(db);
    this.exportRepo = new repository.Export(db);
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

  public user = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const filepath = await this.exportRepo.userTemplate(res, userId, Number(req.query.year));
    return res.download(filepath)
    return

    const subjects = await this.subjectRepo.export(36);
    // res.json(subjects);
    // return 

    const dataTeachSemesterOne = await this.modelClasses.findAll({
      attributes: ['name', 'code', 'num_student', 'semester', 'num_credit', 'num_lesson', 'exam_supervision', 'exam_create', 'marking', 'form_exam'],
      where: {
        user_id: 40,
        semester: 0
      },
      // group: ['semester'],
      raw: true,
    })

    const dataTeachSemesterOneHVMM = dataTeachSemesterOne.filter(classs => {
      return codeHVMM.some(t => classs.code.includes(t))
    }).map(classs => {
      let time = classs.num_lesson
      let timeMiddle = 0
      let middleSemester = ''
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
        timeMiddle += 1;
        middleSemester += 'Ra đề, '
      }
      if (classs.exam_supervision) {
        timeMiddle += 1;
        middleSemester += 'coi thi, '
      }
      if (classs.marking) {
        middleSemester += 'chấm thi '
        switch (classs.form_exam) {
          case FORM_EXAM.TL:
            timeMiddle += classs.num_student * 0.05
            middleSemester += 'TL'
            break;
          case FORM_EXAM.TN:
            timeMiddle += classs.num_student * 0.05
            middleSemester += 'TN'
            break;
          case FORM_EXAM.VD:
            timeMiddle += classs.num_student * 0.125
            middleSemester += 'VD'
            break;
          default:
            break;
        }
      }

      return {
        ...classs,
        time,
        timeMiddle,
        middleSemester,
      }
    })

    const dataTeachSemesterOneFee = dataTeachSemesterOne.filter(classs => {
      return codeFee.some(t => classs.code.includes(t))
    }).map(classs => {
      let time = classs.num_lesson
      let timeMiddle = 0
      let middleSemester = ''
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
        timeMiddle += 1;
        middleSemester += 'Ra đề, '
      }
      if (classs.exam_supervision) {
        timeMiddle += 1;
        middleSemester += 'coi thi, '
      }
      if (classs.marking) {
        middleSemester += 'chấm thi '
        switch (classs.form_exam) {
          case FORM_EXAM.TL:
            timeMiddle += classs.num_student * 0.05
            middleSemester += 'TL'
            break;
          case FORM_EXAM.TN:
            timeMiddle += classs.num_student * 0.05
            middleSemester += 'TN'
            break;
          case FORM_EXAM.VD:
            timeMiddle += classs.num_student * 0.125
            middleSemester += 'VD'
            break;
          default:
            break;
        }
      }

      return {
        ...classs,
        time,
        timeMiddle,
        middleSemester,
      }
    })

    const dataTeachSemesterTwo = await this.modelClasses.findAll({
      attributes: ['name', 'code', 'num_student', 'semester', 'num_credit', 'num_lesson', 'exam_supervision', 'exam_create', 'marking', 'form_exam'],
      where: {
        user_id: 40,
        semester: 1
      },
      raw: true,
    })

    const dataTeachSemesterTwoHVMM = dataTeachSemesterTwo.filter(classs => {
      return codeHVMM.some(t => classs.code.includes(t))
    }).map(classs => {
      let time = classs.num_lesson
      let timeMiddle = 0
      let middleSemester = '';
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
        timeMiddle += 1;
        middleSemester += 'Ra đề, '
      }
      if (classs.exam_supervision) {
        timeMiddle += 1;
        middleSemester += 'coi thi, '
      }
      if (classs.marking) {
        middleSemester += 'chấm thi '
        switch (classs.form_exam) {
          case FORM_EXAM.TL:
            timeMiddle += classs.num_student * 0.05
            middleSemester += 'TL'
            break;
          case FORM_EXAM.TN:
            timeMiddle += classs.num_student * 0.05
            middleSemester += 'TN'
            break;
          case FORM_EXAM.VD:
            timeMiddle += classs.num_student * 0.125
            middleSemester += 'VD'
            break;
          default:
            break;
        }
      }

      return {
        ...classs,
        time,
        timeMiddle,
        middleSemester,
      }
    })

    const dataTeachSemesterTwoFee = dataTeachSemesterTwo.filter(classs => {
      return codeFee.some(t => classs.code.includes(t))
    }).map(classs => {
      let time = classs.num_lesson
      let timeMiddle = 0
      let middleSemester = ''
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
        timeMiddle += 1;
        middleSemester += 'Ra đề, '
      }
      if (classs.exam_supervision) {
        timeMiddle += 1;
        middleSemester += 'coi thi, '
      }
      if (classs.marking) {
        middleSemester += 'chấm thi '
        switch (classs.form_exam) {
          case FORM_EXAM.TL:
            timeMiddle += classs.num_student * 0.05
            middleSemester += 'TL'
            break;
          case FORM_EXAM.TN:
            timeMiddle += classs.num_student * 0.05
            middleSemester += 'TN'
            break;
          case FORM_EXAM.VD:
            timeMiddle += classs.num_student * 0.125
            middleSemester += 'VD'
            break;
          default:
            break;
        }
      }

      return {
        ...classs,
        time,
        timeMiddle,
        middleSemester,
      }
    })

    const thesis = await this.thesisRepo.export(41);
    const topics = await this.topicRepo.export(41);
    const articles = await this.articleRepo.export(41);
    const books = await this.bookRepo.export(41);
    const inventions = await this.inventionRepo.export(41);
    const compilations = await this.compilationRepo.export(41);
    const educations = await this.educationRepo.export(41);
    const scientifics = await this.scientificRepo.export(41);
    // res.json(topicFormats);
    // return;
    res.render('exportTemplate', {
      dataTeachSemesterOneHVMM,
      dataTeachSemesterOneFee,
      dataTeachSemesterTwoHVMM,
      dataTeachSemesterTwoFee,
      subjects,
      topics,
      articles,
      books,
      inventions,
      compilations,
      educations,
      scientifics,
      thesis,
    });
  }
}
