import TaskStatus from '../enums/task-status.enum';
import User from '../../entities/user.entity';

export default interface ICreateTaskDto {
  text: string;
  status: TaskStatus;
  assignedEmployee?: User;
}
