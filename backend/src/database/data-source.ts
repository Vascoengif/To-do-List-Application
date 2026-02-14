import * as path from 'path';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Entities from './';

// We point to the root folder (../../.env)
dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,      // false because of the usage of migrations
  logging: true,
  entities: Entities,
  migrations: [path.join(__dirname, 'migrations/*.ts')],
  subscribers: [],
});