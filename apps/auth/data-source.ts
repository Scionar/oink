import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from './src/users/user.entity';
require('dotenv').config();

let config: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.AUTHDB_URL,
  port: Number(process.env.AUTHDB_PORT),
  username: process.env.AUTHDB_USER,
  password: process.env.AUTHDB_PASSWD,
  database: process.env.AUTHDB_DB,
  entities: [User],
  synchronize: true,
};

switch (process.env.NODE_ENV) {
  case 'test':
    config = {
      ...config,
      username: 'test',
      password: 'test',
      database: 'oink_auth_test',
      synchronize: true,
    };
    break;
}

export const datasource = new DataSource(config);
export { config };