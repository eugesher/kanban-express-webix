import { getRepository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { ISaveTaskDto } from '../types/dto/save-task.dto';

export class TasksService {
  private static async insert(
    dto: ISaveTaskDto,
    currentUserId: string,
  ): Promise<Task[]> {
    const tasksByStatus = await getRepository(Task)
      .createQueryBuilder('tasks')
      .where('tasks.status = :status', { status: dto.status })
      .orderBy('tasks.order', 'ASC')
      .getMany();
    const task = new Task();
    task.text = dto.text;
    task.status = dto.status;
    task.assignedEmployee = dto.user_id
      ? await getRepository(User).findOne(dto.user_id)
      : await getRepository(User).findOne(currentUserId);

    tasksByStatus.push(task);

    const result = tasksByStatus.map((task, index) => {
      return { ...task, order: index };
    });

    return await getRepository(Task).save(result);
  }

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

  private static async delete(dto: ISaveTaskDto): Promise<Task[]> {
    const tasksByStatus = await getRepository(Task)
      .createQueryBuilder('tasks')
      .where('tasks.status = :status', { status: dto.status })
      .orderBy('tasks.order', 'ASC')
      .getMany();

    const index = tasksByStatus.findIndex((task) => task.id === dto.id);
    tasksByStatus.splice(index, 1);

    await getRepository(Task).delete(dto.id);

    const result = tasksByStatus.map((task, index) => {
      return { ...task, order: index };
    });

    return await getRepository(Task).save(result);
  }

  public static async save(
    dto: ISaveTaskDto,
    currentUserId: string,
  ): Promise<Task | Task[]> {
    const task = await getRepository(Task).findOne(dto.id);

    if (dto.webix_move_parent) {
      return await TasksService.move(task, dto);
    }

    if (dto.webix_operation === 'insert') {
      return await TasksService.insert(dto, currentUserId);
    }

    if (dto.webix_operation === 'delete') {
      return await TasksService.delete(dto);
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
