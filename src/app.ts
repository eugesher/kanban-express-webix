import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { createConnection } from 'typeorm';
import { ensureLoggedIn } from 'connect-ensure-login';
import passport from './middlewares/passport';
import ormconfig from './config/ormconfig';
import sessionOptions from './config/session-options';
import AppController from './controllers/app.controller';
import errorHandler from './exceptions/error-handler';

dotenv.config();

const PORT = parseInt(process.env.APP_PORT);
const LISTEN_MESSAGE = `magic happens on port ${PORT}`;

createConnection(ormconfig)
  .then(() => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session(sessionOptions));
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/register', AppController.register);
    app.post(
      '/login',
      passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/dashboard',
      }),
    );

    app.get('/', AppController.getHomePage);
    app.get('/login', AppController.getLoginPage);
    app.get('/dashboard', ensureLoggedIn(), AppController.getDashboardPage);
    app.get('/secret', ensureLoggedIn(), AppController.getSecretPage);
    app.get('/logout', AppController.onLogout);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(LISTEN_MESSAGE);
    });
  })
  .catch((error) => {
    console.error(error);
  });
