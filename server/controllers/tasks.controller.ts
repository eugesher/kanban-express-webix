import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ICreateTaskDto from '../types/dto/create-task.dto';
import Task from '../entities/task.entity';
import User from '../entities/user.entity';

export default class TasksController {
  public static async create(
    req: Request<any, any, ICreateTaskDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      let task = new Task();
      Object.assign(task, { ...req.body, ...req.user });

      task = await getRepository(Task).save(task);
      res.send(task);
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
      const user = req.user as User;
      const tasks = await getRepository(Task)
        .createQueryBuilder('tasks')
        .leftJoinAndSelect('tasks.assignedEmployee', 'users')
        .where('tasks.author_id = :id', { id: user.id })
        .orWhere('tasks.assigned_employee_id = :id', { id: user.id })
        .getMany();

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
