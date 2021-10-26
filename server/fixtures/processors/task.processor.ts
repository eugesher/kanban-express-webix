import { IProcessor } from 'typeorm-fixtures-cli';
import Task from '../../entities/task.entity';
import TaskStatus from '../../types/enums/task-status.enum';

export default class TaskProcessor implements IProcessor<Task> {
  private static getRandomStatus() {
    const values = Object.keys(TaskStatus);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return TaskStatus[enumKey];
  }

  public preProcess(name: string, object: any): any {
    const status = TaskProcessor.getRandomStatus();
    return { ...object, status };
  }
}
