import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { datasource } from '../data-source';
import { TokenModule } from './token/token.module';

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
    TokenModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
