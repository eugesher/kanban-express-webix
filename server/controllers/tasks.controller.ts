import { NextFunction, Request, Response } from 'express';
import ISaveTaskDto from '../types/dto/save-task.dto';
import TasksService from '../services/tasks.service';

export default class TasksController {
  public static async save(
    req: Request<any, any, ISaveTaskDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = req.body;
      res.send(await TasksService.save(dto));
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
      const tasks = await TasksService.findAll();
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
