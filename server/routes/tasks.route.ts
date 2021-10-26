import { Router } from 'express';
import TasksController from '../controllers/tasks.controller';

const tasksRoute = Router();

tasksRoute.get('/', TasksController.findAll);
tasksRoute.post('/update', TasksController.update);

export default tasksRoute;
