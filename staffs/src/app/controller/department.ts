import { Request, Response } from 'express';
import * as repository from '../../repo';
import Controller from './base';
import { types } from '../../common';
import { DB } from '../../models';
import { pickForSearch } from '../../utils';

export default class DepartmentController extends Controller {
  private departmentRepo: repository.Department;

  constructor(db: DB) {
    super(db);
    this.departmentRepo = new repository.Department(db);
  }

  public search = async (req: Request, res: Response) => {
    const data: types.department.DepartmentSearchParam = {
      ...pickForSearch(<types.department.DepartmentSearchParam>req.query, ['name', 'code', 'search', 'sort', 'sortColumn']),
      ...this.getOffsetLimit(req),
    };

    const departments = await this.departmentRepo.search(
      <types.department.DepartmentSearchParam>data
    );
    res.json(departments);
  };

  public create = async (req: Request, res: Response) => {
    const data: types.department.DepartmentCreateParam = {
      name: req.body?.name,
      code: req.body?.code,
    };
    const department = await this.departmentRepo.create(data);
    res.json(department);
  };

  public update = async (req: Request, res: Response) => {
    const data: types.department.DepartmentUpdateParam = {
      name: req.body?.name,
      code: req.body?.code,
    };
    const id = req.params.id;
    const department = await this.departmentRepo.update(id, data);
    res.json(department);
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;

    const department = await this.departmentRepo.delete(id);
    res.json(department);
  };
}
