import { NextFunction, Request, Response } from 'express';
import { TasksService } from '../services/tasks.service';
import { User } from '../entities/user.entity';
import { ISaveTaskDto } from '../types/dto/save-task.dto';

export class TasksController {
  public static async save(
    req: Request<any, any, ISaveTaskDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = req.body;
      const currentUserId = (req.user as User).id;
      res.send(await TasksService.save(dto, currentUserId));
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
          color: task.color,
          user_id: task.assignedEmployee.id,
        };
      });
      res.send(result);
    } catch (e) {
      return next(e);
    }
  }
}
