import { Request } from 'express';
import ICreateTaskDto from '../types/dto/create-task.dto';
import Task from '../entities/task.entity';
import { getRepository } from 'typeorm';
import User from '../entities/user.entity';

export default class TasksService {
  public static async create(
    req: Request<any, any, ICreateTaskDto>,
  ): Promise<Task> {
    const task = new Task();
    Object.assign(task, { ...req.body, ...req.user });

    return await getRepository(Task).save(task);
  }

  public static async findAll(req: Request): Promise<Task[]> {
    const user = req.user as User;

    return await getRepository(Task)
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.assignedEmployee', 'users')
      .where('tasks.author_id = :id', { id: user.id })
      .orWhere('tasks.assigned_employee_id = :id', { id: user.id })
      .getMany();
  }
}
