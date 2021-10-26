import IUpdateTaskDto from '../types/dto/update-task.dto';
import Task from '../entities/task.entity';
import { getRepository } from 'typeorm';
import User from '../entities/user.entity';

export default class TasksService {
  public static async update(dto: IUpdateTaskDto): Promise<Task> {
    const task = await getRepository(Task).findOne(dto.id);
    task.text = dto.text;
    task.status = dto.status;
    task.assignedEmployee = await getRepository(User).findOne(dto.user_id);

    return await getRepository(Task).save(task);
  }

  public static async findAll(): Promise<Task[]> {
    return await getRepository(Task)
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.assignedEmployee', 'users')
      .getMany();
  }
}
