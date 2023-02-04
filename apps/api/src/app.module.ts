import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FoodsController } from "./foods/foods.controller";
import { FoodsService } from "./foods/foods.service";
import { FoodsModule } from "./foods/foods.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { ConsumptionService } from './consumption/consumption.service';
import { ConsumptionModule } from './consumption/consumption.module';

@Module({
  imports: [
    FoodsModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsumptionModule,
  ],
  controllers: [AppController, FoodsController],
  providers: [AppService, FoodsService, ConsumptionService],
})
export class AppModule {}
