import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { createConnection } from 'typeorm';
import ormconfig from './config/ormconfig';

dotenv.config();

createConnection(ormconfig).then((connection) => {
  const app = express();

  app.listen(parseInt(process.env.APP_PORT));
});
