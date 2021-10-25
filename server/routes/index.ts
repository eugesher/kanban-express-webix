import { Request, Response, Router } from 'express';
import UsersController from '../controllers/users.controller';
import passport from '../middlewares/passport.middleware';
import ISession from '../types/interfaces/session.interface';
import tasksRoute from './tasks.route';
import usersRoute from './users.route';
import TasksController from '../controllers/tasks.controller';

const api = Router();

api.post('/register', UsersController.register);
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

api.get('/data', TasksController.findAll);

api.use('/tasks', tasksRoute);
api.use('/users', usersRoute);

export default api;
