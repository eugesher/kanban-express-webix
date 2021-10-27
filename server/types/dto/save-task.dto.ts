import { TaskStatus } from '../enums/task-status.enum';

export interface ISaveTaskDto {
  id: string;
  text: string;
  status: string;
  user_id: string;
  webix_operation: 'insert' | 'update' | 'delete';
  webix_move_index?: string;
  webix_move_id?: string;
  webix_move_parent?: TaskStatus;
}
