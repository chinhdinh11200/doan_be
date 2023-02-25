import { Sequelize } from 'sequelize';
import { DB } from '../../models';

export default class Controller {
  protected readonly db: DB;
  constructor(db: DB) {
    this.db = db;
  }
}
