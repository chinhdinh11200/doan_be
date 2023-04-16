import { Sequelize } from 'sequelize';
import { DB } from '../../models';
import { Request, Response } from 'express';

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

  protected ok(res: Response, data: { rows: any; count?: number }) {
    if (data.count !== undefined) {
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
      res.setHeader('X-Total-Count', data.count);
    }

    res.json(data.rows);
  }

  protected created(res: Response, data: any) {
    res.json({ ...data, success: true });
  }
}
