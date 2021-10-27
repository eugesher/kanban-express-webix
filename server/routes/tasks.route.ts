import { Router } from 'express';
import TasksController from '../controllers/tasks.controller';

const tasksRoute = Router();

tasksRoute.get('/', TasksController.findAll);
tasksRoute.post('/save', TasksController.save);

export default tasksRoute;
