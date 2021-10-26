import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import Task from './task.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  avatar: string;

  @OneToMany(() => Task, (task) => task.assignedEmployee)
  assignedTasks: Task[];

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    this.password = await hash(
      this.password,
      parseInt(process.env.PASSWORD_SALT_ROUNDS),
    );
  }
}
