import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entities/user.entity';
import IRegisterDto from '../types/dto/register.dto';
import UnprocessableEntityException from '../exceptions/unprocessable-entity.exception';

const EMAIL_TAKEN_MESSAGE = 'email is already taken';

export default class UsersController {
  public static async register(
    req: Request<any, any, IRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      let user = await getRepository(User).findOne({
        username: req.body.username,
      });

      if (user) {
        return next(new UnprocessableEntityException(EMAIL_TAKEN_MESSAGE));
      }

      user = new User();
      Object.assign(user, req.body);

      user = await getRepository(User).save(user);
      delete user.password;
      res.send(user);
    } catch (e) {
      return next(e);
    }
  }
}
