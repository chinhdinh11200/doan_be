import { Sequelize } from 'sequelize';
import { DB } from '../../models';
import { Request } from 'express';

export default class Controller {
  protected readonly db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  
  protected getOffsetLimit(req: Request) {
    const page = Number(req.query.offset);
    const limit = Number(req.query.limit);
    if (
      !isNaN(limit) &&
      req.query.limit !== undefined &&
      req.query.limit !== null &&
      req.query.limit !== ''
    ) {
      if (!isNaN(page) && page > 0) {
        const offset = page * limit - limit;
        return { offset, limit };
      } else {
        return { offset: 0, limit };
      }
    } else {
      return { offset: 0, limit: '' };
    }
  }
}
