import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./users/user.entity";
import { TokenController } from './token/token.controller';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';
import { config, datasource } from '../data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        migrationsRun: false
      }),
      dataSourceFactory: async () => {
        return datasource
      },
      inject: [ConfigService],
    }),
    UsersModule,
    TokenModule
  ],
  controllers: [AppController, UsersController, TokenController],
  providers: [AppService, UsersService, TokenService],
})
export class AppModule {}
