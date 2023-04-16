import { DB } from '../../models';
import Controller from './base';
import * as repository from '../../repo';
import { NextFunction, Request, Response } from 'express';

export default class ExportController extends Controller {
  private readonly exportRepo: repository.Export
  constructor(db: DB) {
    super(db);
    this.exportRepo = new repository.Export(db);
  }

  public user = async (req: Request, res: Response, next: NextFunction) => {
    const filepath = await this.exportRepo.user();

    return res.download(filepath)
  }
}
