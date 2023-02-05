import { Module } from "@nestjs/common";
import { FoodsModule } from "../foods/foods.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ConsumptionController } from "./consumption.controller";
import { ConsumptionService } from "./consumption.service";

@Module({
  imports: [PrismaModule, FoodsModule],
  controllers: [ConsumptionController],
  providers: [ConsumptionService],
})
export class ConsumptionModule {}
