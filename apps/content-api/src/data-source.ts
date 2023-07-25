import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Food } from './foods/food.entity';
import { Consumption } from './consumption/consumption.entity';
import { Profile } from './profile/profile.entity';
require('dotenv').config();

let config: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.CONTENTDB_URL,
  port: Number(process.env.CONTENTDB_PORT),
  username: process.env.CONTENTDB_USER,
  password: process.env.CONTENTDB_PASSWD,
  database: process.env.CONTENTDB_DB,
  entities: [Food, Consumption, Profile],
  synchronize: true,
};

switch (process.env.NODE_ENV) {
  case 'test':
    config = {
      ...config,
      username: 'test',
      password: 'test',
      database: 'oink_content_test',
      synchronize: true,
    };
    break;
}

export const datasource = new DataSource(config);
export { config };
