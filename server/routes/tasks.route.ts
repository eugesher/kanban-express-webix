import { Router } from 'express';
import TasksController from '../controllers/tasks.controller';

const tasks = Router();

tasks.post('/', TasksController.create);
tasks.get('/', TasksController.findAll);

export default tasks;
