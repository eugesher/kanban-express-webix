import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    this.password = await hash(
      this.password,
      parseInt(process.env.PASSWORD_SALT_ROUNDS),
    );
  }
}
