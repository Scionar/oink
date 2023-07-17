import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./users/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get('AUTHDB_URL'),
        port: config.get('AUTHDB_PORT'),
        username: config.get('AUTHDB_USER'),
        password: config.get('AUTHDB_PASSWD'),
        database: config.get('AUTHDB_DB'),
        synchronize: true,
        logging: true,
        entities: [User],
        subscribers: [],
        migrations: [],
      }),
      inject: [ConfigService],
    }),
    UsersModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
