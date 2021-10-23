import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { join } from 'path';
import User from '../entities/user.entity';
import IRegisterDto from '../interfaces/register-dto.interface';
import UnprocessableEntityException from '../exceptions/unprocessable-entity.exception';

const EMAIL_TAKEN_MESSAGE = 'email is already taken';

export default class AppController {
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

  public static onLogout(req: Request, res: Response): void {
    req.logout();
    res.redirect('/login');
  }

  public static getHomePage(req: Request, res: Response): void {
    res.sendFile(join(__dirname, '../static/index.html'));
  }

  public static getLoginPage(req: Request, res: Response): void {
    res.sendFile(join(__dirname, '../static/login.html'));
  }

  public static getDashboardPage(req: Request, res: Response): void {
    const user = req.user as User;
    res.send(
      `Hello ${user.username}. Your session ID is ${req.sessionID} and your session expires in ${req.session.cookie.maxAge} milliseconds.<br><br><a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`,
    );
  }

  public static getSecretPage(req: Request, res: Response): void {
    res.sendFile(join(__dirname, '../static/secret-page.html'));
  }
}
