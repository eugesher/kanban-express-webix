import { getRepository } from 'typeorm';
import User from '../entities/user.entity';

export default class UsersService {
  public static async findAll(): Promise<User[]> {
    return await getRepository(User).find();
  }
}
