import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ICreateTaskDto from '../dto/create-task.dto';
import Task from '../entities/task.entity';

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
      res.send(await getRepository(Task).find());
    } catch (e) {
      return next(e);
    }
  }
}
