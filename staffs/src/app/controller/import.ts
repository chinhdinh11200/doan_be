import { User } from './../../models/user';
import * as XLSX from 'xlsx';
import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';
import { types } from '../../common';

interface MovieData {
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

interface Movie {
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
  private readonly importRepo: repository.Import
  constructor(db: DB) {
    super(db);
    this.importRepo = new repository.Import(db);
  }

  public user = async (req: Request, res: Response, next: NextFunction) => {
    // users-20230413T075130167Z405903 TKB-20230413T080451179Z535466
    const wb = XLSX.readFile('./public/TKB-20230413T080451179Z535466.xlsx');
    const sheets = wb.SheetNames;
    const sheetName = wb.Sheets[sheets[6]];
    const range = sheetName + '!A3:H3';
    if (sheets.length > 0) {
      const data = XLSX.utils.sheet_to_json<MovieData>(sheetName, { header: ['tt', 'num_credit', 'll', 'class_name', 'type', 'unit_of_week', 'day_of_week', 'num_unit', 'class_room', 'start_date', 'end_date', 'user'] });
      const movies: Movie[] = data.map(row => {
        return {
          ...row
        }
      });
      // await Movie.bulkCreate(movies); 

      return res.json({
        sheets: sheets[6],
        ccc: movies,
      });
    }

    return res.json({
      ccc: "dfdfdf"
    });
  }
}
