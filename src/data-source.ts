import 'dotenv/config';
import { DataSource } from 'typeorm';
import {
  getPostgresConnectionOptions,
  getPostgresDriverExtra,
} from './config/db-env';
import { User } from './user/user.entity';
import { User1733035200000 } from './migrations/1733035200000-user';

export default new DataSource({
  type: 'postgres',
  ...getPostgresConnectionOptions(),
  extra: getPostgresDriverExtra(),
  entities: [User],
  migrations: [User1733035200000],
});
