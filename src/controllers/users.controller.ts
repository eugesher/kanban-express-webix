import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { IRegisterDto } from '../interfaces/register-dto.interface';
import { UnprocessableEntityException } from '../exceptions/unprocessable-entity.exception';

export async function register(
  req: Request<any, any, IRegisterDto>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    let user = await getRepository(User).findOne({
      username: req.body.username,
    });

    if (user) {
      return next(new UnprocessableEntityException('email is already taken'));
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
