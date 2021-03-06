import dotenv from 'dotenv';
import { SessionOptions } from 'express-session';

dotenv.config();

export const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
};
