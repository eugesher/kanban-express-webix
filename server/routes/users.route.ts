import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';

const usersRoute = Router();

usersRoute.get('/', UsersController.findAll);

export default usersRoute;
