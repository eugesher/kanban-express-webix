import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import passport from '../middlewares/passport.middleware';
import tasksRoute from './tasks.route';
import usersRoute from './users.route';
import TasksController from '../controllers/tasks.controller';
import AppController from '../controllers/app.controller';

const api = Router();

api.post('/register', UsersController.register);
api.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/api/tasks',
  }),
);

api.post('/login/status', AppController.checkLoginStatus);
api.post('/logout', AppController.logout);
api.get('/data', TasksController.findAll);

api.use('/tasks', tasksRoute);
api.use('/users', usersRoute);

export default api;
