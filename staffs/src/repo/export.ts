import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import * as XLSX from 'xlsx';

export default class ExportRepository extends BaseRepository {
  private readonly model: DB['Exam'];
  private readonly modelUser: DB['User'];
  constructor(db: DB) {
    super(db);

    this.model = db.Exam;
    this.modelUser = db.User;
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
    const headings : string[][]= [
      ['Id', 'Movie', 'Category', 'Director', 'Rating']
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users, {
      skipHeader: true, 
    });
    XLSX.utils.sheet_add_aoa(ws, headings);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }); 

    const filepath = `/users.xlsx`;
    
    XLSX.writeFile(wb, filepath); 
    
    return filepath;
  };

  public search = async () => {

  };
}
