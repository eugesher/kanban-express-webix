import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';
import TaskStatus from '../enums/task-status.enum';

@Entity('tasks')
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.new })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => User, (user) => user.assignedTasks, { nullable: true })
  @JoinColumn({ name: 'assigned_employee' })
  assignedEmployee: User;
}
