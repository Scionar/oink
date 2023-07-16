import dotenv from 'dotenv'
import { DataSource } from "typeorm";

dotenv.config()

export const AuthApiDataSource = new DataSource({
  type: "postgres",
  host: process.env.AUTHDB_URL,
  port: parseInt(process.env.AUTHDB_PORT || "5432"),
  username: process.env.AUTHDB_USER,
  password: process.env.AUTHDB_PASSWD,
  database: process.env.AUTHDB_DB,
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
});