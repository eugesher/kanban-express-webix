import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const usersRoute = Router();

usersRoute.post('/', UsersController.register);

export default usersRoute;