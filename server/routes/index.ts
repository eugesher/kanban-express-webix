import { Request, Response, Router } from 'express';
import AppController from '../controllers/app.controller';
import passport from '../middlewares/passport.middleware';
import ISession from '../types/interfaces/session.interface';
import tasksRoute from './tasks.route';
import User from '../entities/user.entity';

const api = Router();

api.post('/register', AppController.register);
api.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/api/data',
  }),
);

api.post('/login/status', (req: Request, res: Response) => {
  const session = req.session as ISession;
  res.send(session.user || null);
});

api.post('/logout', (req: Request, res: Response) => {
  const session = req.session as ISession;
  delete session.user;
  res.send({});
});

api.get('/data', (req: Request, res: Response) => {
  const user = req.user as User;
  res.send([
    {
      user: user.username,
      session: req.sessionID,
      TTL: req.session.cookie.maxAge,
    },
  ]);
});

api.use('/tasks', tasksRoute);

export default api;
