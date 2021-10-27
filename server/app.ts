import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { createConnection } from 'typeorm';
import nocache from 'nocache';
import api from './routes';
import passport from './middlewares/passport.middleware';
import { ormconfig } from './config/ormconfig';
import { sessionOptions } from './config/session-options';
import { errorHandler } from './exceptions';

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
    app.use(nocache());

    app.use('/api', api);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(LISTEN_MESSAGE);
    });
  })
  .catch((error) => {
    console.error(error);
  });
