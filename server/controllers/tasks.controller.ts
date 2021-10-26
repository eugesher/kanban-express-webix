import { NextFunction, Request, Response } from 'express';
import ICreateTaskDto from '../types/dto/create-task.dto';
import TasksService from '../services/tasks.service';

export default class TasksController {
  public static async create(
    req: Request<any, any, ICreateTaskDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.send(await TasksService.create(req));
    } catch (e) {
      return next(e);
    }
  }

  public static async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tasks = await TasksService.findAll(req);
      const result = tasks.map((task) => {
        return {
          id: task.id,
          text: task.text,
          status: task.status,
          user_id: task.assignedEmployee.id,
        };
      });
      res.send(result);
    } catch (e) {
      return next(e);
    }
  }
}
