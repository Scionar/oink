import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';
import { ConfigModule } from '@nestjs/config';
import { ConsumptionModule } from './consumption/consumption.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasource } from './data-source';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        migrationsRun: false,
      }),
      dataSourceFactory: async () => {
        return datasource;
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FoodsModule,
    ConsumptionModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
