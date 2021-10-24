import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

dotenv.config();

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '..', 'entities/*{.ts,.js}')],
  migrations: [join(__dirname, '..', 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'server/migrations',
  },
};

export default ormconfig;
