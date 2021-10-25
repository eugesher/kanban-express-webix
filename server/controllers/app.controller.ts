import { Request, Response } from 'express';
import ISession from '../types/interfaces/session.interface';

export default class AppController {
  public static checkLoginStatus(req: Request, res: Response) {
    const session = req.session as ISession;
    res.send(session.user || null);
  }

  public static logout(req: Request, res: Response) {
    const session = req.session as ISession;
    delete session.user;
    res.send({});
  }
}
