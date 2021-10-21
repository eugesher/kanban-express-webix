import dotenv from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '..', 'entity/*{.ts,.js}')],
  migrations: [join(__dirname, '..', 'migration/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default ormconfig;
