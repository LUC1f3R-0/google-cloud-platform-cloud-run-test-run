import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { User1733035200000 } from './migrations/1733035200000-user';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: [User1733035200000],
});
