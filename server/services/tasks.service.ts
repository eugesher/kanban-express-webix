import ISaveTaskDto from '../types/dto/save-task.dto';
import Task from '../entities/task.entity';
import { getRepository } from 'typeorm';
import User from '../entities/user.entity';

export default class TasksService {
  private static async move(task: Task, dto: ISaveTaskDto): Promise<Task[]> {
    const moveIndex = parseInt(dto.webix_move_index);
    const moveParent = dto.webix_move_parent;
    const tasksByStatus = await getRepository(Task)
      .createQueryBuilder('tasks')
      .where('tasks.status = :status', { status: moveParent })
      .orderBy('tasks.order', 'ASC')
      .getMany();
    const isInternalMove = tasksByStatus.some((task) => task.id === dto.id);

    if (isInternalMove) {
      const index = tasksByStatus.findIndex((t) => t.id === task.id);
      tasksByStatus.splice(index, 1);
      tasksByStatus.splice(moveIndex, 0, task);
    } else {
      task.status = dto.status;
      tasksByStatus.splice(moveIndex, 0, task);
    }

    const result = tasksByStatus.map((task, index) => {
      return { ...task, order: index };
    });

    return await getRepository(Task).save(result);
  }

  public static async save(dto: ISaveTaskDto): Promise<Task> {
    const task = await getRepository(Task).findOne(dto.id);

    if (dto.webix_move_parent) {
      await TasksService.move(task, dto);
    }

    task.text = dto.text;
    task.order = parseInt(dto.webix_move_index);
    task.assignedEmployee = await getRepository(User).findOne(dto.user_id);
    return await getRepository(Task).save(task);
  }

  public static async findAll(): Promise<Task[]> {
    return await getRepository(Task)
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.assignedEmployee', 'users')
      .orderBy('tasks.order', 'ASC')
      .getMany();
  }
}
