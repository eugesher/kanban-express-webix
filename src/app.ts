import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import ormconfig from './config/ormconfig';
import { createConnection } from 'typeorm';
import { errorHandler } from './errors/error-handler';
import { signup } from './controllers/auth.controller';

dotenv.config();

createConnection(ormconfig)
  .then(() => {
    const app = express();
    const port = parseInt(process.env.APP_PORT);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/signup', signup);
    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`magic happens on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
