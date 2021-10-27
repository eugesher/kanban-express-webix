import { IProcessor } from 'typeorm-fixtures-cli';
import { Task } from '../../entities/task.entity';
import { TaskColor } from '../../types/enums/task-color.enum';

export default class TaskProcessor implements IProcessor<Task> {
  private static getRandomColor() {
    const values = Object.keys(TaskColor);
    const enumKey = values[String(Math.floor(Math.random() * values.length))];
    return TaskColor[enumKey];
  }

  public preProcess(name: string, object: any): any {
    const color = TaskProcessor.getRandomColor();
    return { ...object, color };
  }
}
