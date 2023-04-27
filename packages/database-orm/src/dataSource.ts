import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AuthApiDataSource = new DataSource({
  type: "postgres",
  host: process.env.AUTHDB_URL,
  port: parseInt(process.env.AUTHDB_PORT || "5432"),
  username: process.env.AUTHDB_USER,
  password: process.env.AUTHDB_PASSWD,
  database: process.env.AUTHDB_DB,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
