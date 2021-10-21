import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { IAuthReqBody } from '../interfaces/auth-req-body.interface';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error';

export async function signup(
  req: Request<any, any, IAuthReqBody>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    let user = await getRepository(User).findOne({
      email: req.body.email,
    });

    if (user) {
      next(new UnprocessableEntityError('email is already taken'));
    }

    user = new User();
    Object.assign(user, req.body);
    user = await getRepository(User).save(user);
    delete user.password;
    res.send(user);
  } catch (e) {
    next(e);
  }
}
