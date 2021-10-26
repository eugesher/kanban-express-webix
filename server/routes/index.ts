import { Router } from 'express';
import passport from '../middlewares/passport.middleware';
import tasksRoute from './tasks.route';
import usersRoute from './users.route';
import AppController from '../controllers/app.controller';

const api = Router();

api.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/api/tasks',
  }),
);

api.post('/login/status', AppController.checkLoginStatus);
api.post('/logout', AppController.logout);

api.use('/tasks', tasksRoute);
api.use('/users', usersRoute);

export default api;
