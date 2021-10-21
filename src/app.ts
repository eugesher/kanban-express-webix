import { join } from 'path';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: join(__dirname, '..', 'dev.env') });

const app = express();

app.listen(parseInt(process.env.APP_PORT));
