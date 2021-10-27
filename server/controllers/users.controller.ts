import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../services/users.service';

export class UsersController {
  public static async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await UsersService.findAll();
      const result = users.map((user) => {
        return {
          id: user.id,
          value: user.fullName,
          image: user.avatar,
        };
      });
      res.send(result);
    } catch (e) {
      return next(e);
    }
  }
}
