import { join } from 'path';
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

export function getHomePage(req: Request, res: Response): void {
  res.sendFile(join(__dirname, '../static/index.html'));
}

export function getLoginPage(req: Request, res: Response): void {
  res.sendFile(join(__dirname, '../static/login.html'));
}

export function getDashboardPage(req: Request, res: Response): void {
  const user = req.user as User;
  res.send(
    `Hello ${user.username}. Your session ID is ${req.sessionID} and your session expires in ${req.session.cookie.maxAge} milliseconds.<br><br><a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`,
  );
}

export function getSecretPage(req: Request, res: Response): void {
  res.sendFile(join(__dirname, '../static/secret-page.html'));
}

export function onLogin(req: Request, res: Response): void {
  res.redirect('/dashboard');
}

export function onLogout(req: Request, res: Response): void {
  req.logout();
  res.redirect('/login');
}
