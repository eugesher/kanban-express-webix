import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';
import TaskStatus from '../types/enums/task-status.enum';

@Entity('tasks')
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.new })
  status: string;

  @Column({ type: 'smallint', unsigned: true })
  order: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'assigned_employee_id' })
  assignedEmployee: User;
}
