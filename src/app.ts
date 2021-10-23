import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { createConnection } from 'typeorm';
import { ensureLoggedIn } from 'connect-ensure-login';
import { errorHandler } from './exceptions/error-handler';
import { register } from './controllers/app.controller';
import ormconfig from './config/ormconfig';
import sessionOptions from './config/session-options';
import passport from './middlewares/passport';
import {
  getDashboardPage,
  getHomePage,
  getLoginPage,
  getSecretPage,
  onLogin,
  onLogout,
} from './controllers/app.controller';

dotenv.config();

createConnection(ormconfig)
  .then(() => {
    const app = express();
    const port = parseInt(process.env.APP_PORT);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session(sessionOptions));
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/register', register);
    app.post(
      '/login',
      passport.authenticate('local', { failureRedirect: '/' }),
      onLogin,
    );

    app.get('/', getHomePage);
    app.get('/login', getLoginPage);
    app.get('/dashboard', ensureLoggedIn(), getDashboardPage);
    app.get('/secret', ensureLoggedIn(), getSecretPage);
    app.get('/logout', onLogout);

    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`magic happens on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
