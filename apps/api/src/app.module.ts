import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FoodsController } from "./foods/foods.controller";
import { FoodsService } from "./foods/foods.service";
import { FoodsModule } from "./foods/foods.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    FoodsModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, FoodsController],
  providers: [AppService, FoodsService],
})
export class AppModule {}
