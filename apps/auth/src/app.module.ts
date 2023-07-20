import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenController } from './token/token.controller';
import { datasource } from '../data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        migrationsRun: false,
      }),
      dataSourceFactory: async () => {
        return datasource;
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController, UsersController, TokenController],
  providers: [AppService, UsersService],
})
export class AppModule {}
