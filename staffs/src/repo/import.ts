import { FindAndCountOptions, Op, WhereOptions } from 'sequelize';
import { types } from '../common';
import { DB } from './../models';
import BaseRepository from './_base';
import * as XLSX from 'xlsx';
import { Response } from 'express';

export default class ImportRepository extends BaseRepository {
  constructor(db: DB) {
    super(db);
  }

  public user = async () => {}
}