import { Router } from 'express';
import TasksController from '../controllers/tasks.controller';

const tasksRoute = Router();

tasksRoute.post('/', TasksController.create);
tasksRoute.get('/', TasksController.findAll);

export default tasksRoute;
